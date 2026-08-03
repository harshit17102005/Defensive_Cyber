const API_URL = import.meta.env.PROD ? 'https://api.defensive-cyber.com/api' : '/api';

export const defaultServices = [
  {
    _id: 'default-1',
    slug: 'digital-forensics',
    title: 'Digital Forensics',
    description: 'Uncover digital evidence and analyze cyber incidents to identify attack origins, preserve data integrity, and support investigations.',
    fullDescription: "When something's gone wrong — a breach, suspected fraud, an insider incident, or data that's disappeared without explanation — you need to know exactly what happened, and you need proof that will hold up if things go legal.\n\nThat's what we do. We collect, preserve, and analyze digital evidence from computers, servers, mobile devices, cloud accounts, and network logs, following strict chain-of-custody procedures so nothing gets challenged later on technicalities. We can recover data that's been deleted or hidden, piece together a timeline of exactly who did what and when, and put it all into a report that's clear enough for a courtroom and detailed enough for your legal team to act on.\n\nThis is the service you want when you need answers about something that's already happened — a breach you're trying to understand, an employee you suspect of wrongdoing, or evidence you need to preserve properly before it's gone for good.",
    icon: 'Search'
  },
  {
    _id: 'default-2',
    slug: 'cyber-threat-intelligence',
    title: 'Cyber Threat Intelligence',
    description: 'Proactively identify emerging cyber threats, monitor attacker activities, and deliver actionable intelligence to strengthen your security posture.',
    fullDescription: "Most companies find out they're a target after the damage is done. This is about flipping that — knowing what's coming before it lands on your doorstep.\n\nWe keep a constant watch on the threat landscape relevant to your industry: dark web chatter, criminal forums, leaked credentials tied to your domain, new malware campaigns, and the behavior of threat groups that tend to go after businesses like yours. But we don't just hand you a pile of raw data and wish you luck — every report we send is built to be acted on, whether that means alerting your SOC team to a specific new tactic or giving your leadership a clear picture of the risks worth budgeting for.\n\nIf you'd rather get ahead of problems than clean up after them, this is where you start.",
    icon: 'Radar'
  },
  {
    _id: 'default-3',
    slug: 'incident-response',
    title: 'Incident Response',
    description: 'Rapidly detect, contain, and recover from cyber incidents while minimizing business disruption and reducing security risks.',
    fullDescription: "An active cyber incident isn't a technical inconvenience — it's a business emergency, and how fast you move in the first hour often decides how bad the story ends up being.\n\nOur incident response team steps in to contain the threat, figure out how far it's spread, and get it out of your systems — whether that's ransomware, a compromised account, or a business email attack that's already cost you money. Once things are stable, we help bring your systems back safely and walk you through exactly what happened and how to stop it from happening again. If you'd rather not be scrambling to find help mid-crisis, we also offer retainer arrangements so you have a response team on call before you ever need one.\n\nThis is the service for right now — when something's actively happening and you need it stopped.",
    icon: 'AlertTriangle'
  },
  {
    _id: 'default-4',
    slug: 'reverse-engineering-malware-analysis',
    title: 'Reverse Engineering & Malware Analysis',
    description: 'Analyze malicious software to understand its behavior, uncover attack techniques, and develop effective detection and mitigation strategies.',
    fullDescription: "Finding malware on your network is only half the problem. The real question is what it actually does — what it's after, how it talks to whoever's controlling it, and how it slipped past your defenses in the first place.\n\nWe take suspicious files and binaries apart at the code level, using both static and dynamic analysis, to expose exactly how they behave. That includes tracking down command-and-control infrastructure, identifying evasion techniques, and — where possible — connecting the malware back to known threat groups or campaigns. From there, we build custom detection rules so the same threat can't walk back through the front door.\n\nIf you've found something suspicious and \"just delete it\" doesn't feel like enough, this is the service that gives you the full picture.",
    icon: 'Bug'
  }
];

export const defaultPosts = [
  {
    _id: 'fallback-news',
    id: 'fallback-news',
    type: 'news',
    title: 'Critical Infrastructure Under Attack',
    excerpt: 'Recent reports indicate a surge in coordinated attacks against critical infrastructure sectors globally, prompting new security mandates.',
    isExternal: false
  },
  {
    _id: 'fallback-blog',
    id: 'fallback-blog',
    type: 'blog',
    title: 'Zero Trust: Beyond the Buzzword',
    excerpt: 'Understanding the core principles of Zero Trust Architecture and practical steps to implement it within your enterprise network.',
    isExternal: false
  }
];

export const fetchPosts = async () => {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const data = await res.json();
    return data.length > 0 ? data : defaultPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return defaultPosts;
  }
};

export const fetchExternalNews = async (query = 'cybersecurity', max = 6) => {
  try {
    const res = await fetch(`${API_URL}/news/external?keywords=${query}&limit=${max}`);
    const data = await res.json();
    if (!res.ok) {
      console.error('Mediastack API Error via Backend:', data);
      throw new Error(data.error?.message || 'Failed to fetch external news');
    }
    
    return data.data.map((article, index) => ({
      id: `ext-${index}-${Date.now()}`,
      title: article.title,
      excerpt: article.description || 'Read more about this story at the source.',
      content: article.description || '',
      type: 'news',
      created_at: article.published_at,
      isExternal: true,
      url: article.url,
      image: article.image
    }));
  } catch (error) {
    console.error('Error fetching external news:', error);
    return [];
  }
};

export const fetchPostById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return defaultPosts.find(p => p.id === id || p._id === id) || null;
  }
};

export const createPost = async (postData, token) => {
  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!res.ok) throw new Error('Failed to create post');
    return await res.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id, postData, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!res.ok) throw new Error('Failed to update post');
    return await res.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete post');
    return await res.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitContact = async (contactData) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit message');
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchReviews = async () => {
  try {
    const res = await fetch(`${API_URL}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return await res.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const createReview = async (reviewData, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!res.ok) throw new Error('Failed to create review');
    return await res.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReview = async (id, reviewData, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });
    
    if (!res.ok) throw new Error('Failed to update review');
    return await res.json();
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete review');
    return await res.json();
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

export const fetchClients = async () => {
  try {
    const res = await fetch(`${API_URL}/clients`);
    if (!res.ok) throw new Error('Failed to fetch clients');
    return await res.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
};

export const createClient = async (clientData, token) => {
  try {
    const res = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
    
    if (!res.ok) throw new Error('Failed to create client');
    return await res.json();
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData, token) => {
  try {
    const res = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(clientData)
    });
    
    if (!res.ok) throw new Error('Failed to update client');
    return await res.json();
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const deleteClient = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!res.ok) throw new Error('Failed to delete client');
    return await res.json();
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// --- SERVICES API ---

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return data.length > 0 ? data : defaultServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    return defaultServices;
  }
};

export const fetchServiceById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return await res.json();
  } catch (error) {
    console.error('Error fetching service:', error);
    return defaultServices.find(s => s.slug === id || s._id === id) || null;
  }
};

export const createService = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to create service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (id, data, token) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id, token) => {
  try {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to delete service');
    }
    return await res.json();
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// --- COMPANY INFO API ---

export const fetchCompanyInfo = async () => {
  try {
    const res = await fetch(`${API_URL}/company-info`);
    if (!res.ok) throw new Error('Failed to fetch company info');
    return await res.json();
  } catch (error) {
    console.error('Error fetching company info:', error);
    // Return a default structure so frontend doesn't break
    return {
      emails: ['defensivecyber404@gmail.com'],
      phones: ['+91 99716 24200'],
      locations: ['New Delhi, India']
    };
  }
};

export const updateCompanyInfo = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/company-info`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update company info');
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating company info:', error);
    throw error;
  }
};
