// selecionar tags com "required"
const fields = document.querySelectorAll("[required]");

function validateField(field){
    // valueMissing
    // typeMismatch
    function verifyErrors(){
        let foundError = false;

        for (let error in field.validity) {
            if (field.validity[error] && !field.validity.valid) {
                foundError = error;           
            }
        }
        return foundError;
    }

    function customMessage(typeError){
        const messages = {
            password: {
                valueMissing: "Por favor, digite sua senha."
            },
            email: {
                valueMissing: "Por favor, digite seu email.",
                typeMismatch: "Por favor, preencha com um email válido"
            }            
        }
        return messages[field.type][typeError];
    }

    function setCustomMessage(message){
        const spanError = field.parentNode.querySelector("span.error");

        if (message) {
            spanError.classList.add("active");
            spanError.innerHTML = message;
        } else {
            spanError.classList.remove("active");
            spanError.innerHTML = "";
        }
    }

    return function(){
        const error = verifyErrors();

        if (error){
            const message = customMessage(error);

             field.style.borderColor = "red"
             setCustomMessage(message)
        } else {
                field.style.borderColor = "#F8F8F8"
               setCustomMessage()
        }
    }
}

function customValidation(event){
    const field = event.target;
    const validation = validateField(field);

    validation();
}

// rodar campos e ouvir o "invalid"
for (const field of fields) {
    field.addEventListener("invalid", event => {
        // tirar o "bubble" default do navegador
        event.preventDefault()

        customValidation(event)
    });
    field.addEventListener("blur", customValidation)
}

// adicionar ação no submit
document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("Enviar formulário");

        //  Para não enviar o formulário
        event.preventDefault();
    });