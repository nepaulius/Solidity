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
        
        courier_balance +=1 ether;
        
        balance -= (amount * price);
        consumer[msg.sender] += amount;
        movies -= amount;
        Sellers_balance  += (amount * price);
    }
    
    function refundMovies(uint amount) public {
        
        if (consumer[msg.sender] < amount) {
            revert();
        }
        
        courier_balance += 1 ether;
        balance += (amount * price);
        consumer[msg.sender] -= amount;
        movies += amount;
    }
}
