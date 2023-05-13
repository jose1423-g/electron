const btn = document.getElementById('btn')
const content = document.getElementById('content')
btn.addEventListener('click', function () {
    if (content.className == 'd-none') {
        content.classList.remove('d-none')          
    } else {
        content.classList.add('d-none')          
    }
})

document.getElementById('darkmode').addEventListener('click', async () => {
    const isDark = await window.darkMode.toggle()
    document.getElementById('source').innerHTML = isDark ? 'dark' : 'light'

})


/* const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response); // prints out 'pong'
}

func()
 */
