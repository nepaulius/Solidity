# Solidity


* Programa imituoja filmų pirkimą. ```"Vartotojas"``` prisijungęs gali pirkti/grąžinti pinigus (dėl patogesnio skaičiavimo filmas kainuoja **1 ehter**),
```"kurjeris"``` "uždirba" už kiekvieną pirkimą/grąžinimą, taip pat matomas ir ```"pardavėjo"``` balansas. Kiekvienas pirkimo/pardavimo dalyvis programoje
yra *Ganache* sugeneruotas adresas su 100 ether.
___
* Veikimo eiga:\
1)Truffle pagalba (*truffle compile*) sukompiliuojamas  solidity kontraktas :\ 
Solidity kontrakto kodas : 

```sol
pragma solidity >=0.4.0 <=0.6.0;


contract Movies{

    address payable owner;
    address seller = 0x320002B374F326BF28816facc6Be61531d0ADbEf;
    address courier =  0xd3BA56E55bb25D76982da869f2c5e9ebB489171B;
    uint public Sellers_balance;
    uint public courier_balance;
    
    uint public movies;
    uint public balance;

    uint constant price = 1 ether;
    
    mapping(address => uint) public consumer;
    //mapping(address => uint ) public courier;
    
    

    constructor() public {
        owner = msg.sender;
        movies = 20;
        balance = msg.sender.balance;
        Sellers_balance=seller.balance;
        courier_balance = courier.balance;
    }
    
    
    
    // validation pre-buying;
    modifier preBuy() {
        require(movies > 0);
        _;
    }
    

    
    function buyMovies(uint amount) public preBuy {
       
        if (amount > movies || msg.sender.balance<(amount * price)) {
            revert();
        }
        
       // owner.transfer(amount * price);
        
        courier_balance +=1;
        
        balance -= (amount * price);
        consumer[msg.sender] += amount;
        movies -= amount;
        Sellers_balance  += (amount * price);
    }
    
    function refundMovies(uint amount) public {
        
        if (consumer[msg.sender] < amount) {
            revert();
        }
        
        courier_balance += 1;
        balance += (amount * price);
        consumer[msg.sender] -= amount;
        movies += amount;
    }
}
```
___
2) Komanda *truffle migrate --reset* deploy'ina kontraktą į lokalų tinklą:\
```js
var news = artifacts.require("./Movies.sol");
module.exports = function(deployer) {
deployer.deploy(news);
};
```
___
3)*Npm run dev* paleidžia sugeneruot json srcipt'ą, Web3j ir Metamask pagalba kontraktą sujungiu su interneto nasršykle:\
```js
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

};

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});
```
___
4) Html, Css, Javascipt padarytas ```"front-end'as"```:\
\
![](https://user-images.githubusercontent.com/45967745/71185883-ee769e00-2284-11ea-9ece-31cd0ab2f2de.png)
