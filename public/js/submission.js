const submission = async (event) => {
    event.preventDefault();

    const submit = document.querySelector('#submission');
    const title = document.querySelector('#title')

console.log(submit, title)


    if(submit) {
        console.log('this worked');
        fetch('/api/submission', {
            method: 'POST',
            // body: {title: title.value},
            body: JSON.stringify({ title: title.value, post: submit.value }),
            headers: {'Content-Type': 'application/json'},
        })
        .then(response =>
            response.json())
        .then(response => {
            // console.log(response)
            if (response.ok) {
                document.location.replace('/dashboard')
            } else {
                console.log('no work')
            }
        }) 
    }

}

document
    .querySelector('.submission-form')
    .addEventListener('submit', submission);