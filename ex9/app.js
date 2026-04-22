const API_KEY = "ca370d51a054836007519a00ff4ce59e";
const imglist_Url =
  `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&per_page=10&format=json&nojsoncallback=1`;

const gallery = document.getElementById("gallery");
const statusText = document.getElementById("status");
const jsonOutput = document.getElementById("json-output");
const triggerButton = document.querySelector("button");

function setStatus(message) {
  statusText.textContent = message;
}

function showJson(payload) {
  jsonOutput.textContent = JSON.stringify(payload, null, 2);
}

function clearGallery() {
  gallery.innerHTML = "";
}

function renderEmptyState(message) {
  clearGallery();
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  emptyState.textContent = message;
  gallery.appendChild(emptyState);
}

function add_new_img(dataset) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.src = dataset.imageUrl;
  image.alt = dataset.title;
  image.loading = "lazy";
  image.referrerPolicy = "no-referrer";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = dataset.title;

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = `Photo ID: ${dataset.id} | Owner: ${dataset.owner}`;

  body.append(title, meta);
  card.append(image, body);
  gallery.appendChild(card);
}

async function fetchPhotoSizes(photoId) {
  const img_Url =
    `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;
  const response = await fetch(img_Url);

  if (!response.ok) {
    throw new Error(`Failed to load photo sizes. HTTP ${response.status}`);
  }

  const payload = await response.json();

  if (payload.stat !== "ok" || !payload.sizes?.size?.length) {
    throw new Error("Flickr did not return any usable photo sizes.");
  }

  console.log("flickr.photos.getSizes:", payload);

  const sizes = payload.sizes.size;
  const bestFit =
    sizes.find((size) => size.label === "Large") ||
    sizes.find((size) => size.label === "Medium 800") ||
    sizes[sizes.length - 1];

  return bestFit.source;
}

async function getimg() {
  triggerButton.disabled = true;
  setStatus("Loading recent photos from Flickr...");
  renderEmptyState("Loading photos...");

  try {
    const response = await fetch(imglist_Url);

    if (!response.ok) {
      throw new Error(`Failed to load recent photos. HTTP ${response.status}`);
    }

    const payload = await response.json();
    console.log("flickr.photos.getRecent:", payload);
    showJson(payload);

    const photos = payload.photos?.photo ?? [];

    if (!photos.length) {
      renderEmptyState("No Flickr photos are available right now.");
      setStatus("Loaded successfully, but no photos were returned.");
      return;
    }

    const datasets = await Promise.all(
      photos.map(async (photo) => {
        const imageUrl = await fetchPhotoSizes(photo.id);
        return {
          id: photo.id,
          title: photo.title?.trim() || "Untitled Flickr Photo",
          owner: photo.owner || "Unknown owner",
          imageUrl,
        };
      })
    );

    clearGallery();
    datasets.forEach(add_new_img);
    setStatus(`Loaded ${datasets.length} recent Flickr photos.`);
  } catch (error) {
    renderEmptyState("Loading failed. Please try again later.");
    setStatus(error instanceof Error ? error.message : "An unknown error occurred.");
    showJson({
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    });
  } finally {
    triggerButton.disabled = false;
  }
}

window.getimg = getimg;
