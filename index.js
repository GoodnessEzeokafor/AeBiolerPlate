const contractSource = `

`
const contractAddress ='ct_2Z62rihrZ881vcFEbi9P3BXeLccawJonUyamstBZBFWteC58bA'

var client = null // client defuault null
var Arr = [] // empty arr
var fileListLength = 0 // empty product list lenghth


// asychronus read from the blockchain
async function callStatic(func, args) {
const contract = await client.getContractInstance(contractSource, {contractAddress});
  const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));
  const decodedGet = await calledGet.decode().catch(e => console.error(e));
  return decodedGet;
}

//Create a asynchronous write call for our smart contract
async function contractCall(func, args, value) {
  const contract = await client.getContractInstance(contractSource, {contractAddress});
  console.log("Contract:", contract)
  const calledSet = await contract.call(func, args, {amount:value}).catch(e => console.error(e));
  console.log("CalledSet", calledSet)
  return calledSet;
}


// mustche

function renderFileList(){
  let template = $('#template').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, {fileListArr});
  $("#getFile").html(rendered); // id to render your temlplate
  console.log("Mustashe Template Display")
}


window.addEventListener('load', async() => {
  $("#loader").show();

  client = await Ae.Aepp();




  // fileListLength = await callStatic('getFileLength',[]);
  
  // console.log('Files Length: ', fileListLength);

  // for(let i = 1; i < fileListLength + 1; i++){
  //   const getFileList = await callStatic('get_file_by_index', [i]);
  //   fileListArr.push({
  //     index_counter:i,
  //     name:getFileList.name,
  //     id:getFileList.id,
  //     description:getFileList.description,
  //     createdAt:new Date(getFileList.createdAt),
  //     owner:getFileList.author,
  //     updatedAt:getFileList.updatedAt,
  //     file_hash:getFileList.file_hash
  //   })
  // }
  renderFileList();  
  $("#loader").hide();
});

window.addEventListener('load', async()=>{
  client = await Ae.Aepp();
  
})
$('#addFile').click(async function(event){
  $("#loader").show();
  
  $("#loader").hide();
  
  
  event.preventDefault();
})


 
// Display add form
$("#add_file_btn").click(function(event){
  console.log("Show Form")
  var form_add = ($("#display_add_form"));
  var get_file = ($("#getFile"));
  var loader = ($("#loader"));
  var btn_add = ($("#add_file_btn"));
  
  console.log(form_add)
  form_add.show();
  loader.hide();
  get_file.hide();
  btn_add.hide();
  event.preventDefault();
})

