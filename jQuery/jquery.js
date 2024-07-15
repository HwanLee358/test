//  jQuery => 추상화(자바의 인터페이스), 모든 문법의 결과가 대체로 jQuery 객체
/*  jQuery 태그 탐색 : $(''); => 함수형태 
    : css selector
        # : id 속성
        . : class 속성
        tagName : tag 검색
        [attribute] : 일반속성
            -> [attribute='value']  : 특정 속성 값이 value인 경우
            -> [attribute^='value'] : 특정 속성 값이 value로 시작하는 경우
            -> [attribute$='value'] : 특정 속성 값이 value로 끝나는 경우
            -> [attribute*='value'] : 특정 속성 값이 value를 포함하는 경우
        
        :checked    : checked 속성이 true인 태그 검색

        공백 : 하위요소 (Ex: tr input)
        >   : 자식요소 (Ex: tr > input)
        공백이 없는 경우 : 해당 태그가 특정 속성값을 가지는 경우(Ex: table.list)  


        ============================================
        부모 : parent()
        자식 : children(), first(), last()
        형제 : prev(), next()
*/
$(function(){ // js의 DOMContentLoaded : jQuery의 ready
    // DOM이 완성되는 경우 수행할 코드


    // on() : 이벤트 핸들러 등록 메소드
    $('#insertBtn').on('click', insertTrTag);
    $('button#ajaxBtn').on('click', ajaxData);

    $('tbody > tr, [type="text"]').on('click', function(e){
        if(e.target.tagName == 'SELECT') return;

        console.log('target Tag', e.target);
        console.log('currentTarget', e.currentTarget);
        console.log('this', this);        
    })    

});

function insertTrTag(event){
    // $('<tagName />');
    // or $('<tagName id="name" class="sel input"></tagName>');

    /*
        innerHtml : html()
        textContent : text()
        class : addClass(), removeClass(), hasClass(), toggleClass()
        value : val()
        style : css()
        기타  : attr(), prop()
    */

    let trTag = $('<tr />');

    // 체크 박스
    let tdTag = $('<td />');
    let inputTag = $('<input />').prop('type','checkbox');
    console.log(inputTag.prop('type'));
    // closest() : 상위(조상) 요소 중 해당 조건을 만족하는 첫번째 태그
    tdTag.append(inputTag);
    trTag.append(tdTag);

    // No.
    tdTag = $('<td />').text(100);
    trTag.append(tdTag);

    // 아이디
    trTag.append(
        $('<td />').append(
            $('<input />').prop('type', 'text').prop('name', 'id')
        )
    );

    // 비밀번호
    trTag.append(`<td><input type="password" name="password"></td>`);

    // 구분
    let firstOpt = $('<option />').text('남자').val('Male');
    let secondOpt = $('<option />').text('여자').val('Female');
    let selectTag = $('<select />').prop('name','gender').append(firstOpt).append(secondOpt);

    tdTag = $('<td />').append(selectTag);
    trTag.append(tdTag);

    // 이름
    inputTag = $('<input />').prop('type', 'text').prop('name', 'name');
    tdTag = $('<td />').append(inputTag);
    trTag.append(tdTag);
    // 가입날짜
    trTag.append(`<td><input type="date" name="joinDate"></td>`);

    $('tbody').append(trTag);
}
function ajaxData(event){

    let userAray = getCheckedUsers();
    printTable()
}

function printTable(){
    let table = $('table');

    console.log(table.html());
    console.log(table.text());
    console.log(table.find('input[type="password"]').val());
    console.log(table.css('border'));
    $('table tr:even').css('background-color','skyblue');
    console.log(table.find('select:eq(1)').prop('name'));
}
function getCheckedUsers(){
    // let chList = $('input[type="radio"]').filter(':checked').not('#allChk');
    let chList = $('input:checked').not('#allChk');
    
    let array = [];
    chList.each((idx, tag)=>{
        // 중요한 사항) 반복문 안에서 jQuery 객체는 깨짐.
        // 자바스크립트 문법을 사용해야 함

        // 해당 tag 변수를 활용해서 <tr />태그를 찾기
        let trTag = tag.closest('tr');
        // trTag 변수를 활용해서 하위 요소 중 입력 태그를 검색하기
        let dataTag = trTag.querySelectorAll('input, select');
        
        let obj = {};
        dataTag.forEach(tag => {
            if(tag.name == '') return;
            obj[tag.name] = tag.value;
        });

        array.push(obj);
    });
    console.log(array);
    return array;
}

