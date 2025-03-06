const API_BASE_URL = 'http://localhost:5000/api/auth'; 

export const signIn = async (email, password) =>{
    const response = await fetch(`${API_BASE_URL }/signIn` ,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),
    });

    if(!response.ok){
        throw new Error('Echec de la connexion...');
    }

    return response.json()
};

export const signUp = async (
    firstName, 
    lastName,
    birthDate,
    userName,
    email, 
    password, 
    confirmPassword
    ) => {
    const response = await fetch(`${API_BASE_URL} /signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            firstName,
            lastName,
            birthDate,
            userName,
            email,
            password,
            confirmPassword
        }),
    })

    if(!response.ok){
        throw new Error("echec de l'inscription...")
    }
    return response.json();
};

export const signOut = async (userId) =>{
    const response = await fetch(`${API_BASE_URL} /signout`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId}),
    });

    if(!response.ok){
        throw new Error('Echec de la connexion...')
    }

    return response.json();
};