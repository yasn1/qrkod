let qr = document.getElementById("qrcode");
let er = true
let qsub = document.getElementById("submit");
const error = (x) => {
    er=false
    const container = document.getElementById("error");
    container.style.animation = "open3 1s"
    const msg = document.createElement("a")
    msg.innerText = x;
    container.appendChild(msg)
    container.style.display = "block";
    qsub.value="HATA!"
    qsub.style.color="red";
    qsub.style.background="white";
    qsub.style.border="1px solid red"
    qsub.disabled = true;
    qsub.style.cursor = "not-allowed"
    setTimeout(()=>{
        container.style.animation = "close3 1s"
    },5000)
    setTimeout(()=>{
        msg.remove()
        container.style.display = "none"
        er=true
        qsub.disabled = false;
        qsub.value="OLUŞTUR"
        qsub.style.color="";
        qsub.style.background=""
        qsub.style.border="";
        qsub.style.cursor="";
    },5900)
}


const control = async (x) => {
    qsub.value = "YÜKLENİYOR..."
    const url = await fetch(`/api/qrurl?url=${x}`)
        .then(response => response.text())
    if(!qr.hasChildNodes() && x){
        const container = document.createElement("div");
        container.id = "imgcontainer"
        qr.appendChild(container);
        const qrimage = document.createElement("img");
        qrimage.id = "qrimage"
        qrimage.alt = `QR KOD: ${x}`
        qrimage.src = url
        const sub = document.createElement("input");
        sub.type = "submit"
        sub.value = "Kapat"
        sub.id = "qrsub"
        container.appendChild(qrimage)
        container.appendChild(sub)
        document.querySelector(".bg").style.display = "block"
    }else{
        (er?error("Yazı kutucuğuna bir şey yazarak QR kod oluşturabilirsiniz."):false);
    }
}
qr.addEventListener("click", (event)=>{
    if (event.target.id === "qrsub") {
        document.querySelector(".bg").style.display = "none"
        document.getElementById("imgcontainer").remove()
        document.getElementById("text").value = ""
        qsub.value = "OLUŞTUR"
    }
});