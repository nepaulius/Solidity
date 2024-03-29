App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('movies.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      App.contracts.movies = TruffleContract(data);
    
      // Set the provider for our contract
      App.contracts.movies.setProvider(App.web3Provider);
    
      
      return App.init();

    });

    // return App.bindEvents();
      // return App.AddNewsButton();
      // return App.kill();

  },
  init: async function() {

    var postInstance;
    var boo;
    var coo;
    

    App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.movies();
    }).then(function(result){

      b = result;

      $("#show").text(b);
       

    });



    App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.balance();
    }).then(function(result){

      boo = result;
      $("#show2").text(boo);

    });

    
    $("#cl3").click(function(){

      var amount=$("#show3").val();
      console.log(amount);

      App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.buyMovies(amount);
       }).then(function(result){
        coo = result;
        console.log(coo);
      });  
    });





    $("#cl4").click(function(){

      var add=$("#show4").val();
      console.log(add);

      App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.consumer(add);
       }).then(function(result){
        coo = result;
        $("#show5").text(coo);
        console.log(coo);
      });  
    });


    var temp_refund;
    $("#cl5").click(function(){

    var add=$("#show6").val();
    console.log(add);

    App.contracts.movies.deployed().then(function(instance){
    var a = instance;
    console.log(a);
    return a.refundMovies(add);
    }).then(function(result){
       temp_refund = result;
       $("#show5").text(temp_refund);
       console.log(temp_refund);
      });  
    });

    App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.Sellers_balance();
    }).then(function(result){

      b = result;

      $("#shop_bal").text(b);
       

    });

      

       App.contracts.movies.deployed().then(function(instance){
      var a = instance;
      console.log(a);
      return a.courier_balance();
    }).then(function(result){

      b = result;

      $("#courier_bal").text(b);
       

    });


  },



//     App.contracts.news.deployed().then(function(instance){
//       postInstance = instance;
//       return postInstance.newsCount();
//     }).then(function(result){

//       var counts = result.c[0];
//       console.log("Total News : "+counts);

//       for (var i = 1; i <= counts; i ++) {
//         postInstance.newsfeeds(i).then(function(result)
//         {
//           console.log("Publisher Address:" +result[0]);
//           console.log("News:" +result[1]);

//           var newsRow = $('#newsRow');
//           var postTemplate = $('#postTemplate');

//           postTemplate.find('.panel-title').text(result[0]);
//           postTemplate.find('.desc').text(result[1]);
//           newsRow.append(postTemplate.html());
//          });
//       }
//     }); 
// },

  // AddNewsButton: function() {
  //   $(document).on('click', '.addNews', App.AddNews);
  // },

  // kill:function(){

  //   $("#cl").on('click','.hello',App.addkill);

  // },

  // addkill:function()
  // {
  //   console.log("kerp");
  // }

  
//   AddNews:function(event){
//     var post = document.getElementById('post').value
//     var postInstance;
//     App.contracts.news.deployed().then(function(instance){
//       postInstance = instance;
//       return postInstance.addnews(post);
//     }); 
//     console.log("News posted");
//   },
// };
};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});