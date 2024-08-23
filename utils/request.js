const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


// Get All Properties
const fetchProperties = async ({ showfeatured = false } = {}) => {
  try {
    if (!apiDomain) {
      return []
    }
    const res = await fetch(`${apiDomain}/properties${showfeatured ? '/featured' : ''}`);

    if (!res.ok) {
      throw new Error('Failed To Fetch Data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return []; // Return an empty array in case of error
  }
};


// Get Single Property 
const fetchProperty = async (id) => {
  try {
    if (!apiDomain) {
      return null
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed To Fetch Data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return null; // Return an empty array in case of error
  }
};

export { fetchProperties, fetchProperty }
