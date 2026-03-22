const fileInput = document.getElementById("fileInput");
const previewImage = document.getElementById("preview-image");
const analyzeBtn = document.getElementById("analyzeBtn");
const dropArea = document.getElementById("drop-area");

const uploadScreen = document.getElementById("uploadScreen");
const resultScreen = document.getElementById("resultScreen");
const resultImage = document.getElementById("resultImage");
const predictionResult = document.getElementById("predictionResult");
const solutionResult = document.getElementById("solutionResult");

const diseaseSolutions = {
  Apple___Apple_scab: [
    "Remove fallen leaves & infected twigs",
    "Apply Mancozeb or Captan fungicide",
    "Use resistant varieties (Liberty, Enterprise)",
    "Ensure proper pruning & airflow",
  ],

  Apple___Black_rot: [
    "Remove mummified fruits and prune cankers",
    "Spray Captan or Copper fungicides",
    "Avoid overhead watering",
    "Maintain orchard sanitation",
  ],

  Apple___Cedar_apple_rust: [
    "Remove nearby juniper host plants",
    "Spray Myclobutanil, Propiconazole, or Mancozeb",
    "Use resistant varieties (Redfree, Liberty)",
    "Improve orchard airflow and sanitation",
  ],

  Apple___healthy: ["Leaf is healthy — continue regular care"],

  Blueberry___healthy: ["Blueberry leaf healthy — maintain pH and watering"],

  "Cherry_(including_sour)___Powdery_mildew": [
    "Spray sulfur, neem oil or potassium bicarbonate",
    "Prune to improve airflow",
    "Avoid excess nitrogen fertilizer",
  ],

  "Cherry_(including_sour)___healthy": ["Healthy leaf — routine monitoring"],

  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": [
    "Rotate crops",
    "Remove debris",
    "Apply Azoxystrobin or Triazole fungicides",
    "Plant resistant hybrids",
  ],

  "Corn_(maize)___Common_rust_": [
    "Grow resistant hybrids",
    "Use Propiconazole if severe",
    "Maintain field hygiene",
  ],

  "Corn_(maize)___Northern_Leaf_Blight": [
    "Crop rotation",
    "Spray Mancozeb or Chlorothalonil",
    "Use resistant varieties",
  ],

  "Corn_(maize)___healthy": ["Corn leaf healthy — continue crop nutrition"],

  Grape___Black_rot: [
    "Prune infected leaves and berries",
    "Spray Captan or Myclobutanil",
    "Avoid overhead watering",
  ],

  "Grape___Esca_(Black_Measles)": [
    "Remove infected wood",
    "Avoid water stress",
    "Use systemic fungicides early",
  ],

  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": [
    "Spray Copper oxychloride or Mancozeb",
    "Improve ventilation",
  ],

  Grape___healthy: ["Healthy grape leaf"],

  "Orange___Haunglongbing_(Citrus_greening)": [
    "Remove infected trees",
    "Control psyllids (Imidacloprid spray)",
    "Apply zinc & micronutrients",
    "Use certified disease-free plants",
  ],

  Peach___Bacterial_spot: [
    "Apply copper spray",
    "Use resistant varieties",
    "Avoid overhead irrigation",
  ],

  Peach___healthy: ["Healthy peach leaf"],

  "Pepper,_bell___Bacterial_spot": [
    "Use copper + streptomycin rotation",
    "Use certified seeds",
    "Avoid wet foliage",
  ],

  "Pepper,_bell___healthy": ["Healthy pepper leaf"],

  Potato___Early_blight: [
    "Spray Mancozeb or Chlorothalonil",
    "Remove infected leaves",
    "Avoid overhead watering",
  ],

  Potato___Late_blight: [
    "Spray Metalaxyl immediately",
    "Destroy infected plants",
    "Use certified seed",
  ],

  Potato___healthy: [
    " Potato leaf looks healthy — no visible signs of blight, spots, or pests.",
    " Maintain consistent soil moisture — avoid waterlogging to prevent root rot.",
    " Ensure 6–10 hours of sunlight daily for strong photosynthesis and tuber development.",
    " Apply balanced fertilizer with nitrogen, phosphorus, and potassium — avoid excessive nitrogen to prevent weak stems.",
    " Monitor regularly for pests like aphids, potato beetles, and leaf miners — use neem oil or biological controls if detected.",
  ],

  Raspberry___healthy: [" Healthy raspberry leaf"],

  Soybean___healthy: [" Healthy soybean leaf"],

  Squash___Powdery_mildew: [
    "Apply sulfur or neem oil",
    "Remove infected leaves",
    "Improve airflow",
  ],

  Strawberry___Leaf_scorch: [
    "Remove infected leaves",
    "Spray Captan",
    "Use drip irrigation",
  ],

  Strawberry___healthy: [" Healthy strawberry leaf"],

  Tomato___Bacterial_spot: [
    "Apply copper fungicide",
    "Avoid overhead watering",
    "Use clean seeds",
  ],

  Tomato___Early_blight: [
    "Remove lower leaves",
    "Spray Mancozeb/Chlorothalonil",
    "Mulch soil",
  ],

  Tomato___Late_blight: [
    "Spray Metalaxyl immediately",
    "Remove infected plants",
    "Do not plant near potatoes",
  ],

  Tomato___Leaf_Mold: [
    "Improve airflow",
    "Apply copper sprays",
    "Keep leaves dry",
  ],

  Tomato___Septoria_leaf_spot: [
    "Remove lower leaves",
    "Spray Mancozeb or Copper",
  ],

  "Tomato___Spider_mites Two-spotted_spider_mite": [
    "Use neem oil or miticide",
    "Increase humidity",
    "Spray underside of leaves",
  ],

  Tomato___Target_Spot: [
    "Remove infected leaves",
    "Apply copper fungicide",
    "Ensure proper watering",
  ],

  Tomato___Tomato_Yellow_Leaf_Curl_Virus: [
    "Remove infected plants",
    "Control whiteflies",
    "Use resistant seeds",
  ],

  Tomato___Tomato_mosaic_virus: [
    "Remove infected plants",
    "Sanitize tools",
    "Avoid tobacco near crops",
  ],

  Tomato___healthy: [
    " Tomato leaf appears healthy — no signs of disease detected.",
    " Maintain regular watering and avoid wetting foliage to prevent fungal infection.",
    " Ensure 6–8 hours of sunlight daily for optimal growth.",
    " Provide balanced fertilizer rich in potassium and calcium to avoid blossom-end rot.",
    " Monitor for pests like aphids, whiteflies, and caterpillars — treat with neem spray if seen.",
  ],
};
function previewFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    alert("Please upload an image file!");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    document.getElementById("preview-container").style.display = "flex";
    dropArea.style.display = "none";
  };
  reader.readAsDataURL(file);
}
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  previewFile(file);
});
function handleDrop(e) {
  e.preventDefault();
  dropArea.classList.remove("highlight");
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    previewFile(file);
  }
}
dropArea.addEventListener("dragover", (e) => e.preventDefault());
dropArea.addEventListener("dragleave", () =>
  dropArea.classList.remove("highlight")
);
dropArea.addEventListener("drop", handleDrop);
document.getElementById("clearPreviewBtn").addEventListener("click", () => {
  fileInput.value = "";
  previewImage.src = "";
  document.getElementById("preview-container").style.display = "none";
  dropArea.style.display = "flex";
});
analyzeBtn.addEventListener("click", async () => {
  if (!fileInput.files.length) {
    alert("Upload or drop a leaf image first!");
    return;
  }
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);
  predictionResult.innerHTML = "🔍 Analyzing...";
  uploadScreen.style.opacity = 0.6;
  try {
    const res = await fetch("/predict", { method: "POST", body: formData });
    const data = await res.json();
    uploadScreen.style.display = "none";
    resultScreen.style.display = "flex";
    resultScreen.style.alignItems = "center";
    resultScreen.style.justifyContent = "space-between";
    resultImage.src = previewImage.src;
    predictionResult.innerHTML = `🌿 <b>Disease:</b> ${data.prediction}<br> 
    <b>Confidence:</b> ${data.confidence}%`;
    const sol = diseaseSolutions[data.prediction];
    solutionResult.innerHTML = sol
      ? `<ul>${sol.map((x) => `<li>${x}</li>`).join("")}</ul>`
      : "No remedy found.";
  } catch (err) {
    console.error("Prediction error:", err);
    predictionResult.innerHTML = "❌ Error while predicting. Please retry.";
  }
});
