pragma solidity >=0.4.0 <=0.6.0;


contract Movies{

    address owner;
    uint public movies;
    uint public balance;
    uint constant price = 1 ether;
    mapping(address => uint) public consumer;
    mapping(uint => Cashier) public cashiers;
    event Transfer(address indexed from, uint value);
    
    
    struct Cashier {
        bytes name;
        uint badgeId;
    }

    constructor() public {
        owner = msg.sender;
        movies = 20;
        balance = msg.sender.balance;
    }
    
    


    // validation pre-buying;
    modifier preBuy() {
        require(movies > 0);
        _;
    }
    
    
        
    //uint public value = msg.value;


    function buyMovies(uint amount) public payable preBuy {
       
        if (amount > movies) {
            revert();
        }
        
        balance -= (amount * price);
        consumer[msg.sender] += amount;
        emit Transfer(owner,(amount * price));
        movies -= amount;
    }
    
    function refundMovies(uint amount) public {
        if (consumer[msg.sender] < amount) {
            revert();
        }
        balance += (amount * price);
        consumer[msg.sender] -= amount;
        movies += amount;
    }
}

