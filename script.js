const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const generatedImage = document.getElementById("generatedImage");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // API endpoint
  const API_URL = "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";

  // Fetch API key from GitHub secrets
  const API_KEY = process.env.HUGGING_FACE_API_KEY;

  // Show loading message
  generatedImage.src = "";
  generatedImage.alt = "Generating image...";

  // Make API request
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    generatedImage.src = imageUrl;
    generatedImage.alt = "Generated Image";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to generate image. Please try again later.");
  }
});
