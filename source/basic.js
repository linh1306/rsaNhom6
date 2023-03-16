

function console_active(index) {
    const btn_after = document.getElementsByClassName('after')
    const after_active = document.getElementsByClassName('after-active')
    for (let i = 0; i < after_active.length; i++) {
        after_active[i].classList = 'after'
    }
    btn_after[index].classList.add('after-active')
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    if (text != '') {
        cache = text
        var message = ''
        if (id == 'outputPrivateKey') message = 'đã sao chép Private Key'
        else if (id == 'outputPublicKey') message = 'đã sao chép Public Key'
        else message = 'đã sao chép Chữ kí số'
        setTimeout(() => {
            alert(message)
        }, 300);
    }
}

function pateText(id){
    var text = cache
    var textTag = document.getElementById(id).value
    if(text != textTag){
        document.getElementById(id).innerHTML = text;
    }
}

function home(index) {
    textHtml = [`<div class="header">
                <label>Kích thước:</label>
                <div class="">
                    <select class="form-select keySize" id="inputGroupSelect04"
                        aria-label="Example select with button addon">
                        <option value="512">512</option>
                        <option value="1024">1024</option>
                        <option value="2048">2048</option>
                    </select>
                </div>
            </div>
            <div class="content">
                <div class="item" onclick="copyText('outputPrivateKey')">
                    <div class="icon">
                        <i class="fal fa-key"></i>
                        <i class="fas fa-shield"></i>
                    </div>
                    <div class="item-text">
                        <b class="text-inline">Private Key:</b>
                        <p id="outputPrivateKey">${private_key}</p>
                    </div>
                </div>
                <div class="item" onclick="copyText('outputPublicKey')">
                    <div class="icon">
                        <i class="fal fa-key"></i>
                    </div>
                    <div class="item-text">
                        <b class="text-inline">Public Key:</b>
                        <p id="outputPublicKey">${public_key}</p>
                    </div>
                </div>
            </div>
            <button type="button" class="btn-1" onclick="key()">Tạo key</button>`,

            `<div class="header">
                <input type="file" id="file_input1" aria-describedby="inputGroupFileAddon04"
                    onchange="inFile('file_input1','hash1')">
            </div>
            <div class="content">
                <div class="h2-item-text">
                    <div class="">
                        <b for="hash1" class="form-label mt-1 me-2">Băm SHA-1 đầu vào:</b>
                    </div>
                    <p class="word-p" id="hash1">${sha}</p>
                </div>
                <div class="h2-item-text" onclick="copyText('DigitalSignatures')">
                    <div class="">
                        <b for="DigitalSignatures" class="form-label mt-1 me-2">Chữ kí số:</b>
                    </div>
                    <p class="word-p" id="DigitalSignatures" >${signature}</p>
                </div>
            </div>
            <button type="button" class="btn-1" onclick="encryption()">Mã hoá</button>`,
        
            `<div class="header">
                <input type="file" id="file_input2" aria-describedby="inputGroupFileAddon04"
                    onchange="inFile('file_input2','hash2')">
            </div>
            <div class="content">
                <div class="h2-item-text">
                    <div class="">
                        <b for="hash2">Băm SHA-1 đầu vào:</b>
                    </div>
                    <p class="word-p" id="hash2"></p>
                </div>

                <div id="input-3" class="h2-item-text" onclick="pateText('decryption')">
                    <div class="">
                        <b for="decryption">Nhập chữ ký số:</b>
                    </div>
                    <textarea class="word-p" id="decryption"></textarea>
                </div>
            </div>
            <button type="button" class="btn-1" onclick="decryption()">Kiểm tra</button>`]
    var container = document.getElementsByClassName("container")[0];
    container.remove();
    var container1 = document.createElement("div");
    container1.innerHTML = textHtml[index];
    container1.classList.add('container')
    var app = document.getElementsByClassName("app")[0];
    app.appendChild(container1);
}