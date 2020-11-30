var requestURL = 'https://raw.githubusercontent.com/Shuddery/web/master/students.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
var students = request.response;
 
const alert = document.querySelector('.alert');
const closeBtn = document.querySelector('.closebtn');

const Module = (function () {

  function add(name, surname, age, averageball) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.averageball = averageball;
  }

  function create(name,surname,age,averageball) {
    const obj = new add(name,surname,age,averageball);
    students.push(obj)
    
  }

  

  return {
    create
   } ;

})();
  
$("#form").on('submit', function (event) {
  event.preventDefault();
  const name = $("#name").val();
  const surname = $("#surname").val();
  const age = $("#age").val();
  const averageball = $("#averageball").val();
  
  if (!name || !surname || !age || !averageball) {
  alert.style.display = 'block';
  console.log('input value');
  return;
  }

  
  

  Module.create(name,surname,age,averageball);
  form.reset();

  let amount = students.length - 1 ;
  $('tbody').append('<tr><td>'+students[amount].name+'</td><td>'
  +students[amount].surname+'</td><td>'
  +students[amount].age+'</td><td>'
  +students[amount].averageball+'</td><td>'
  + `<a onClick="onEdit(this)">Edit</a>
                   <a onClick="onDelete(this)">Delete</a></td></tr>`)
  $('#avg').text("Средняя оценка : " + countAvg(students));
  


});



closeBtn.addEventListener('click', () => {
alert.style.display = 'none';
});

for (let i = 0; i < students.length; i++) {
$('tbody').append('<tr><td>'+students[i].name+'</td><td>'
+students[i].surname+'</td><td>'
+students[i].age+'</td><td>'
+students[i].averageball+'</td><td>'
+ `<a onClick="onEdit(this)">Edit</a>
                 <a onClick="onDelete(this)">Delete</a></td></tr>`)
                 $('#avg').text("Средняя оценка : " + countAvg(students));
                 
                 
}


function countAvg(array) {
  var sum = 0;
    for (var i = 0; i < array.length; i++) {
            sum += +array[i].averageball;
        }
        return (sum / array.length).toFixed(2);
}




}
