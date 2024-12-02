
import { auth } from './firebaseConfig.js'; // Import auth từ firebaseConfig
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';


document.addEventListener('DOMContentLoaded', function () {

    CheckLogin();
    const loginButton = document.getElementById('login');
    const errorUsername = document.querySelector('.error-input-username');
    const errorPassword = document.querySelector('.error-input-password');
    const modal = document.getElementById('modal');
    const modal2 = document.getElementById('modal-error');
    const messageDiv = document.getElementById('msgError');


    loginButton.addEventListener('click', async function (event) {
        errorUsername.style.display = 'none';
        errorPassword.style.display = 'none';
        event.preventDefault();

        const USERNAME = document.getElementById('username');
        const PASSWORD = document.getElementById('password');


        const username = USERNAME.value.trim();
        const password = PASSWORD.value.trim();

        if (!username) {
            errorUsername.style.display = 'block';
            return;
        }
        if (!password) {
            errorPassword.style.display = 'block';
            return;
        }

        signInWithEmailAndPassword(auth, username, password)
        .then(async (userCredential) => {

            const API_URL = `/api/users/Role/${username}`;
            const response = await fetch(API_URL, {
              method: "GET"
            });
          
            const data = await response.json();
            if(data.role == true)
            {
                setCookie('username', username);
                modal.classList.add('show');
                // Tắt modal sau 3 giây
                setTimeout(function () {
                    modal.classList.remove('show');
                    window.location.href = "/home";
                }, 1500);
            }
            else
            {
                messageDiv.innerText = "Bạn không phải quản trị viên";
                modal2.classList.add('show');
                setTimeout(function () {
                    modal2.classList.remove('show');
                    window.location.href = "/login";
                }, 1500);
            }

         
         
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
           
            messageDiv.innerText = errorMessage;
                        modal2.classList.add('show');
                        setTimeout(function () {
                            modal2.classList.remove('show');
                            window.location.href = "/login";
                        }, 1500);
                    return;
        });


    });
});

