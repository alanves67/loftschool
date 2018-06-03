VK.init({
    apiId: 6490541
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}

        /*selFriends =  document.querySelector('#selFriends');
        selFriends.addEventListener('click', e => {
            console.log("target0");
        });*/

     
(async () => {
    try {
        if (localStorage.data2 === undefined){
            console.log("Загружать нечего");

            await auth();
            const [me] = await callAPI('users.get', { name_case: 'gen' });
            const headerInfo = document.querySelector('#headerInfo');
            //const friends = await callAPI('friends.get', { fields: 'city, country, photo_100' });
            const friends = await callAPI('friends.get', { fields: 'photo_100' });
    
            var allFriends1 = [];
            for (var i=0; i<friends.count; i++){
                allFriends1.push(friends.items[i]);
            }
            var allFriends2 = [];

        } else{
            var data1 = JSON.parse(localStorage.data1 || {});
            var data2 = JSON.parse(localStorage.data2 || {});
            console.log(data1);
            console.log(data2);
            allFriends1 = data1;
            allFriends2 = data2;
        }
        //var data1 = JSON.parse(localStorage.data1) || {};
        //console.log(localStorage.data1);
        //var data2 = JSON.parse(localStorage.data2 || {});
        /*if  (data1 == {} && data2 == {}){
            console.log("Загружать нечего");
        }*/
       

        const filterInput1 = document.querySelector('#filter-name-input1');
        const filterInput2 = document.querySelector('#filter-name-input2');
        
        renderFriends1();
        renderFriends2();

      

        function renderFriends1(){
           const friends1 = {
                count: 0,
                items: []
            };
            let friends1_count = 0;
            for (i = 0; i < allFriends1.length; i++){
                if (filterInput1.value){
                    if ( isMatching(allFriends1[i].first_name, filterInput1.value)
                      || isMatching(allFriends1[i].last_name, filterInput1.value) ) {
                        friends1.items[friends1_count] = allFriends1[i];
                        friends1_count++;
                    }
                } else {
                    friends1.items[i] = allFriends1[i];
                    friends1_count++;                    
                }
            }
            friends1.count = friends1_count;

           const template = document.querySelector('#user-template').textContent;
           const render = Handlebars.compile(template);
           const html = render(friends1);
           const results = document.querySelector('#results');
           results.innerHTML = html;

           listFriends1 = document.querySelector('#friends1');
           listFriends1.addEventListener('click', (e) => {
                f1(e);
            });
           
            listFriends1.addEventListener('dragstart', e => {
                var bMouseDownFlag = false;
                //var dragItem = null;
                if (e.target.getAttribute("class")=="friend"){
                //if (e.target == target){
                    bMouseDownFlag = true;
                    var button = e.target.querySelector('.button');
                    document.addEventListener( 'drop', e => {
                        if (bMouseDownFlag) {
                            bMouseDownFlag = false;
                            if (e.screenX * 2 - window.innerWidth >0){
                                button.click();
                            }
                        }
                    })
                    document.addEventListener( 'dragover', e => {
                        if (bMouseDownFlag) {
                            e.preventDefault();
                        }
                    });
                }
            });
        }

        
        
        function renderFriends2(){
           const friends2 = {
            count: 0,
            items: []
            };
            
            let friends2_count = 0;
            for (i = 0; i<allFriends2.length; i++){
                if (filterInput2.value){
                    if (isMatching(allFriends2[i].first_name, filterInput2.value) || isMatching(allFriends2[i].last_name, filterInput2.value)) {
                        friends2.items[friends2_count] = allFriends2[i];
                        friends2_count++;
                    }
                } else {
                    friends2.items[i] = allFriends2[i];
                    friends2_count++;                    
                }
            }
            friends2.count = friends2_count;

           const template2 = document.querySelector('#user-template2').textContent;
           const render2 = Handlebars.compile(template2);
           const html2 = render2(friends2);
           const results2 = document.querySelector('#results2');
           results2.innerHTML = html2;
            null;

            listFriends2 = document.querySelector('#friends2'); 
            listFriends2.addEventListener('click', (e) => {
                f2(e);
             });

            listFriends2.addEventListener('dragstart', e => {
                var bMouseDownFlag = false;
                if (e.target.getAttribute("class")=="friend"){
                    bMouseDownFlag = true;
                    var button = e.target.querySelector('.button');
                    document.addEventListener( 'drop', e => {
                        if (bMouseDownFlag) {
                            bMouseDownFlag = false;
                            if (e.screenX * 2 - window.innerWidth <0){
                                button.click();
                            }
                        }
                    })
                    document.addEventListener( 'dragover', e => {
                        if (bMouseDownFlag) {
                            e.preventDefault();
                        }
                    });
                }
            });
        }

        var listFriends1 = document.querySelector('#friends1'); 
        var listFriends2 = document.querySelector('#friends2');
        var selFriends =  document.querySelector('#selFriends');
        //var selFriends2 =  document.querySelector('#selFriends2');
        
        selFriends.addEventListener('click', e => {
            //console.log("Сохранить", allFriends2[0]);
            localStorage.data1 = JSON.stringify(allFriends1);
            localStorage.data2 = JSON.stringify(allFriends2);
            /*for (var frnd of allFriends2){
                localStorage[frnd.id] = JSON.stringify(frnd);
                
            }*/
        });
        /*selFriends2.addEventListener('click', e => {
            //var data = JSON.parse(localStorage[4075491] ||});
            //console.log("Загрузить", localStorage.data);
            var data1 = JSON.parse(localStorage.data1 || {});
            var data2 = JSON.parse(localStorage.data2 || {});
            console.log("Загрузить", data1);
         });*/      

        function f1(e){
            if (e.target.tagName === "BUTTON"){
              var id = e.target.parentNode.firstChild.nextSibling.id;
              var item;
              var i1 = allFriends1.findIndex(item => item.id == id);
              item = allFriends1[i1];
              if (item){
                allFriends2.push(item);
                allFriends1.splice(i1, 1);
              }
              renderFriends1();
              renderFriends2();
            }
        }

        function f2(e){
            if (e.target.tagName === "BUTTON"){
                var id = e.target.parentNode.firstChild.nextSibling.id;
                var id = e.target.id;
                var item;
                var i1 = allFriends2.findIndex(item => item.id == id);
                item = allFriends2[i1];
                if (item){
                    allFriends1.push(item);
                    allFriends2.splice(i1, 1);
                }
                renderFriends1();
                renderFriends2();
            }
        }

        filterInput1.addEventListener('keyup', function() {
            renderFriends1();
        });

        filterInput2.addEventListener('keyup', function() {
            renderFriends2();
        });

        const isMatching = (full, chunk) => full.indexOf(chunk) > -1;
    } catch (e) {
        console.error(e);
    }
})();

