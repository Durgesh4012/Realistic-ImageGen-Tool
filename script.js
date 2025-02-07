const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const generatedImage = document.getElementById("generatedImage");

generateBtn.addEventListener("click", () => {
  const prompt = promptInput.value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Hugging Face API details
  const API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";
  const API_KEY = "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";

  // Show loading message
  generatedImage.src = "";
  generatedImage.alt = "Generating image...";

  // Make API request
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      generatedImage.src = imageUrl;
      generatedImage.alt = "Generated Image";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to generate image. Please try again later.");
    });
});
