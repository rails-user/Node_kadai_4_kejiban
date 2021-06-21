var xhr = new XMLHttpRequest();

document.getElementById('viewPosts').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('viewCreate').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('viewLogin').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('viewRegister').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('login').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}
document.getElementById('register').onclick = () => {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
}