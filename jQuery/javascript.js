document.addEventListener('DOMContentLoaded', function(e){
    const btn1 = document.getElementById("insertBtn");
    const btn2 = document.getElementById("ajaxBtn");
    const checkbox = document.getElementById("allChk"); 
    btn1.addEventListener("click", insertBtn)
    
    let trList = document.querySelectorAll('tbody > tr');
    for(let tr of trList){
        tr.addEventListener('click', function(e) {
            if(e.target.tagName == 'SELECT') return
            console.log('target Tag', e.target);
            console.log('currentTarget', e.currentTarget);
        })
    }
    
    let a = 1;
    function insertBtn(){
    
        const tr = document.querySelector("tbody tr").cloneNode(true);
        
        tr.children[0].children[0].removeAttribute("disabled");
        tr.children[1].innerText = "00"+(a+1);
        a++;
        tr.children[2].innerHTML = "<input type='text'>";
        tr.children[3].innerHTML = "<input type='text'>";
        tr.children[5].innerHTML = "<input type='text'>";
        tr.children[6].innerHTML = "<input type='date'>";
        document.querySelector("tbody").append(tr);
        
    }
})
