const signupForm = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();
    const verifyPassword = document.querySelector('#verifyPassword').value.trim();
    const name = document.querySelector('#nameSignup').value.trim();
 

//send user id to response
    if (email && password && name ){
        console.log("we made it");
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            return response.json();
        }).then(data => {
            fetch('/api/submission', {
                method: 'POST',
                //pass response.id to this so it will connect our keys
                body: JSON.stringify({ title, post, user_id: data.id }),
                //this is saying that we are sending json with this post request
                headers: {'Content-Type': 'application/json'},
            }).then(response => {
                if (response.ok) {
                    document.location.replace('/profile');
                } else {
                    alert('Failed to sign-up :(');
                }
            })
        })
    }  
    if (password !== verifyPassword) {
        alert("Your passwords do not match!")
    }
};
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupForm);