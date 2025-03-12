"use server"

import { extractIdeas, generateClassDiagram } from "@/lib/processors"

// Direct OpenRouter API integration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

/**
 * Process the user's concept using OpenRouter API directly
 */
export async function processIdea(concept: string, modelId: string) {
  try {
    // Function to call OpenRouter API directly
    async function callOpenRouter(prompt: string) {
      console.log(`Calling OpenRouter API with model: ${modelId}`)

      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://vercel.com", // Replace with your actual domain
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: "user", content: prompt }],
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("OpenRouter API error response:", errorText)
        throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    }

    console.log("Step 1: Identifying related ideas")
    // Step 1: Identify related ideas using the selected model
    const ideasText = await callOpenRouter(
      `Identify and list 10-15 key related concepts, components, or features that would be important for this idea: "${concept}". 
      Return ONLY the list of concepts as individual items without numbering, with each concept separated by a "|" character.
      Each concept should be brief (1-5 words).`,
    )

    const relatedIdeas = extractIdeas(ideasText)
    console.log("Related ideas:", relatedIdeas)

    console.log("Step 2: Generating specification document")
    // Step 2: Generate the French specification document (cahier des charges)
    const specification = await callOpenRouter(
      `Create a formal French "cahier des charges" (specification document) for the following concept: "${concept}".
      Include the following sections:
      1. Introduction et Contexte
      2. Objectifs du Projet
      3. Public Cible
      4. Fonctionnalités Requises
      5. Contraintes Techniques
      6. Livrables Attendus
      7. Calendrier Prévisionnel
      8. Budget Estimatif
      
      Incorporate these related ideas where appropriate: ${relatedIdeas.join(", ")}
      
      Format the document in Markdown, with clear headings and bullet points where appropriate.
      The document should be comprehensive but concise, approximately 800-1200 words.`,
    )

    console.log("Step 3: Generating class diagram")
    // Step 3: Generate a class diagram description
    const diagramText = await callOpenRouter(
      `Create a class diagram in Mermaid syntax for the concept: "${concept}".
      The diagram should include:
      1. Main classes needed to implement the concept
      2. Attributes for each class
      3. Methods for each class
      4. Relationships between classes (inheritance, association, composition, etc.)
      
      Use proper Mermaid class diagram syntax. Include 5-10 classes that would be essential for implementing this concept.
      DO NOT include any explanation text, just the Mermaid diagram code.`,
    )

    const classDiagram = generateClassDiagram(diagramText)

    return {
      relatedIdeas,
      specification,
      classDiagram,
    }
  } catch (error) {
    console.error("Error in processIdea:", error)
    throw error
  }
}

