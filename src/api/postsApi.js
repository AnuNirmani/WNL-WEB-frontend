// src/api/postsApi.js
const API_URL = 'http://127.0.0.1:8000/api/posts';

// src/api/awardsApi.js
export async function fetchAwardsFromApi() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return Array.isArray(data) ? data : data.value || [];
  } catch (error) {
    console.error('Error fetching awards:', error);
    throw error;
  }
}



// src/api/careersApi.js
export async function fetchCareersFromApi() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return Array.isArray(data) ? data : data.value || [];
  } catch (error) {
    console.error('Error fetching careers:', error);
    throw error;
  }
}





// src/api/pressReleaseApi.js
export async function fetchPressReleasesFromApi() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return Array.isArray(data) ? data : data.value || [];
  } catch (error) {
    console.error('Error fetching press releases:', error);
    throw error;
  }
}



// src/api/awardDetailsApi.js
export async function fetchAwardById(id) {
  if (!id) throw new Error('No award ID provided');

  const API_URL = `http://127.0.0.1:8000/api/posts/${id}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Network error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching award:', error);
    throw error;
  }
}



// src/api/pressReleaseDetailsApi.js
export async function fetchPressReleaseDetails(id) {
  const API_URL = `http://127.0.0.1:8000/api/posts/${id}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch press release details');
    const data = await response.json();

    let description = data.description || '';

    // If JSON or array-like text, flatten it
    if (typeof description === 'string' && description.startsWith('[')) {
      try {
        description = JSON.parse(description).join(' ');
      } catch {
        // leave as is
      }
    }

    return {
      title: data.title,
      sub_topic: data.sub_topic,
      description,
      image: data.image,
    };
  } catch (error) {
    console.error('Error fetching press release details:', error);
    throw error;
  }
}

