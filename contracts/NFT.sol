pragma solidity ^0.8.9;

error ONLY_ONWER_CAN_CALL();
error SEND_SUFFICIENT_ETH();


contract LaunchPadNft {

    // LaunchPadNft contract onwer
    address private launchPadNftOwner;

    // number of NFT Created
    uint256 private numOfNftCreated;

    // Cap for Maximum NFT Minted
    uint256 private nftMaxSupply;

    // events
    event CreateNewNft(string uri, uint supply, uint nftPrice, address factoryContractAddress, address indexed nftAddress);
    event WithdrawMoney(address withdrawAddress, uint amount);

    /**
     * @notice struct to store all the data of NFT ( string uri, uint supply, uint nftPrice) and launchPadNftOwner(address launchPadNftOwner) contract
     */
    struct NftStruct {
        string uri;
        uint supply;
        uint nftPrice;
        address launchPadNftAddress;
        address creator;
        address nftAddress;
    }

    /**
     * @notice searching the struct data of NFT and LaunchPadNft using owner address
     */
    mapping(address => NftStruct[]) public allNftData;

    // creator address to check the addresses of nft created
    // creator => NFT addresses
    mapping(address => address[]) public nftAddresses;

    // modifier to allow onwer to call the function
    modifier onlyOwner() {
        if(msg.sender != launchPadNftOwner){
            revert ONLY_ONWER_CAN_CALL();
        }
        _;
    }

    /**
     * @dev constructor to get the owner address of this contract factory
     */
    constructor(address _launchPadNftOwner) {
        launchPadNftOwner = _launchPadNftOwner;
    }

    /**
     * @dev : function to create new course and course address on searchBy Address
     * @param _uri : NFT URI
     * @param _maxSupply : Total supply of NFTs
     * @param _nftPrice : Price of the NFT
     * @param _creatorAddress : Address of the Creator
     */
    function createNFT(string memory _uri, uint256 _maxSupply , bool _wantMaxSupply, uint _nftPrice, address _creatorAddress) public {
        nftMaxSupply = _maxSupply;

        if(_wantMaxSupply == false){
            nftMaxSupply = type(uint256).max;
        }

        NFT nft = new NFT(
            _uri,
            nftMaxSupply,
            _nftPrice,
            address(this),
            _creatorAddress
        );
    
        // Increment the number of NFT
        ++numOfNftCreated;

        // emit CreateNewCourse event
        emit CreateNewNft(_uri, _maxSupply, _nftPrice, address(this), _creatorAddress);

        // Add the new NFT to the mapping
        allNftData[_creatorAddress].push(
            NftStruct(
                _uri,
                _maxSupply,
                _nftPrice,
                address(this),
                _creatorAddress,
                address(nft)
            )
        );
        
        // search the profile by using creator address
        nftAddresses[_creatorAddress].push(address(nft));
    }

    /**
     * @dev function to set new onwer
     * @param _newOnwer address of new onwer
     */
    function setNewOwner(address _newOnwer) public onlyOwner {
        launchPadNftOwner = _newOnwer;
    }

    // function to withdraw the funds from Launchpad contract
    function withdraw(uint256 _amount, address _receiver) external payable onlyOwner{
        if(address(this).balance < _amount){
            revert NOT_ENOUGH_BALANCE();
        }

        (bool success, ) = _receiver.call{value: _amount}("");
        if(!success){
            revert TRANSFER_FAILED();
        }
        emit WithdrawMoney(_receiver , _amount);
    }


    // get the address of Launchpad contract
    function getAddressOfLaunchpadContract() public view returns (address) {
        return address(this);
    }

    // get the address of Launchpad contract owner`
    function getAddressOfLaunchpadOwner() public view returns (address) {
        return launchPadNftOwner;
    }

    // get the number of NFT Created
    function getNftCreated() public view returns(uint){
        return numOfNftCreated;
    }

    // get all NFTs with metadata by creator address
    function getNFTsWithMetadataCreatedByCreator(address _creatorAddress) public view returns(NftStruct[] memory){
        address[] memory _NFTAddresses = nftAddresses[_creatorAddress];
        uint length = _NFTAddresses.length;
        NftStruct[] memory _NFTs = new NftStruct[](length);
        for(uint i = 0; i < length; ++i){
            _NFTs[i] = allNftData[_creatorAddress][i];
        }
        return _NFTs;
    }

    // receive function is used to receive Ether when msg.data is empty
    receive() external payable {}

    // Fallback function is used to receive Ether when msg.data is NOT empty
    fallback() external payable {}
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

error NFT_SOLD_OUT();
error SEND_MORE_MONEY();
error ONLY_OWNER_CAN_CALL();
error NOT_ENOUGH_BALANCE();
error TRANSFER_FAILED();

contract NFT is ERC1155 {
    //events
    event OneNftMinted(address indexed minter, uint256 nftPrice);
    event mutlipleNftMinted(
        address indexed minter,
        uint256 nftPrice,
        uint256 numberOfNFTs
    );
    event WithdrawMoney(address withdrawAddress, uint256 amount);

    // variable to store maximum number of NFT
    uint256 public maxSupply;
    // counter to keep track how many NFT are minted
    uint256 public counter;
    // variable to store the NFT Price;
    uint256 public nftPrice;
    // variable to store launchpad Address
    address payable public launchpadAddress;
    // variable to store owner Address
    address payable public owner;

    /**
     * @dev contructor to set the _uri(metadata), maxSupply , Price of NFT
     * @param _uri get the metadata of NFT
     * @param _maxSupply get the maxSupply, total number of NFT
     * @param _nftPrice get the price of NFT
     */
    constructor(
        string memory _uri,
        uint256 _maxSupply,
        uint256 _nftPrice,
        address _launchpadAddress,
        address _creatorAddress
    ) ERC1155(_uri) {
        _setURI(_uri);
        maxSupply = _maxSupply;
        nftPrice = _nftPrice;
        launchpadAddress = payable(_launchpadAddress);
        owner = payable(_creatorAddress);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert ONLY_OWNER_CAN_CALL();
        }
        _;
    }

    /**
     * @dev nftMint() function to mint and sell 1 NFT
     */
    function nftMint() public payable {
        if (counter + 1 > maxSupply) {
            revert NFT_SOLD_OUT();
        }
        if (msg.value < nftPrice) {
            revert SEND_MORE_MONEY();
        }
        ++counter;
        _mint(msg.sender, counter, 1, "");
        emit OneNftMinted(msg.sender, msg.value);
    }

    /**
     * @dev Airdrop NFT to a given address
     * @param _recipient Address of the recipient to receive the NFT
     */
    function airdropNft(address _recipient) public payable {
        if (counter + 1 > maxSupply) {
            revert NFT_SOLD_OUT();
        }
        if (msg.value < nftPrice) {
            revert SEND_MORE_MONEY();
        }

        ++counter;

        // Mint the NFT to the recipient address
        uint256 tokenId = counter;
        _mint(_recipient, tokenId, 1, "");

        emit OneNftMinted(_recipient, nftPrice); // You may want to emit this event here, or you can create a new airdrop event.
    }

    /**
     * @dev multipleNftMint() function to mint and sell as many NFT user want NFT
     * @param _num get the amount of NFT user want to mint and BUY
     */
    function multipleNftMint(uint256 _num) public payable {
        if (counter + _num > maxSupply) {
            revert NFT_SOLD_OUT();
        }
        if (msg.value < nftPrice * _num) {
            revert SEND_MORE_MONEY();
        }
        counter += _num;
        _mint(msg.sender, 0, _num, "");
        emit mutlipleNftMinted(msg.sender, msg.value, _num);
    }

    /**
     * @notice withdraw(): function to withdraw contract balance
     * @param _amount : amount courseowner want to withdraw
     * @param _withdrawAddress : address courseowner wants to withdraw to
     */
    function withdraw(uint256 _amount, address _withdrawAddress)
        public
        payable
        onlyOwner
    {
        if (getContractBalance() < _amount) {
            revert NOT_ENOUGH_BALANCE();
        }

        // sending money to launchpad contract
        uint256 commissionAmount = (_amount * 5) / 100;
        (bool success, ) = launchpadAddress.call{value: commissionAmount}("");
        if (!success) {
            revert TRANSFER_FAILED();
        }

        // sending money to content creator
        (bool success1, ) = _withdrawAddress.call{
            value: _amount - commissionAmount
        }("");
        if (!success1) {
            revert TRANSFER_FAILED();
        }

        // emit the WithdrawMoney
        emit WithdrawMoney(_withdrawAddress, _amount);
    }

    function setNftPrice(uint256 _newNftPrice) public onlyOwner {
        nftPrice = _newNftPrice;
    }

    //-------------------- view functions -------------------------------

    // get the balance of the contract
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // get the address of this contract
    function getAddressOfCourseContract() public view returns (address) {
        return address(this);
    }

    // get the address of contract owner
    function getAddressOfOwner() public view returns (address) {
        return owner;
    }

    // receive function is used to receive Ether when msg.data is empty
    receive() external payable {}

    // Fallback function is used to receive Ether when msg.data is NOT empty
    fallback() external payable {}
}