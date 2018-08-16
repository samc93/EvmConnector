pragma solidity ^0.4.13;

contract ClaimData {
    
    //Contract owner
    address owner;
    
    constructor() public {
        owner = msg.sender;
    } 

    //Event to signify FIR has been added.
    event FirEvent(string firNo);
    
    //Structure to store FIR Details
    struct FirData{
        string FIR_DATE;
        string FIR_TITLE;
        string SSN;
        string FILE_HASH_LOCATION;
    }
    
    mapping(string => FirData)  FirInfo;
    
    function saveFirData(string _firNo,string _ssn,string _firDate,string _firTitle,string _fileHashLocation) public{
        
        FirData memory userFirData;
        
        userFirData = FirData({
            FIR_DATE:_firDate,
            FIR_TITLE:_firTitle,
            SSN:_ssn,
            FILE_HASH_LOCATION:_fileHashLocation
        });
        
        FirInfo[_firNo] = userFirData;

        FirEvent(_firNo); 
        
    }
    
    function getFirData(string _firNo) public returns (string _ssn,string _firDate,string _firTitle,string _fileHashLocation){
        FirData memory u = FirInfo[_firNo];
        return(u.SSN,u.FIR_DATE,u.FIR_TITLE,u.FILE_HASH_LOCATION);
    }
}