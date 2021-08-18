
### thoughts
- What does the plugin need to do? bare minimum: users can list current round artifacts and buy listed artifacts from within the game
- What happens when the round ends? Current solution: an admin (deployer of contract) is trusted to change the contract to the new rounds token contract. Maybe there is a better solution?
- Old artifacts that get left in after the round ends get permanently frozen after the token contract gets changed. Not sure if this is even that big of a deal
- Is there a better way to design subgraph? The main problem limiting here is the subgraph stores only 100 artifacts and stores them as an array. If subgraph could return something like a dictionary then building a UI is way easier.
- What artifacts are most demanded? What design changes make this overall more useful / convenient / pleasant experience?



### Basic rundown of the plugins current design: 
### Smart contract Market.sol: functions buy, list, unlist. admin only function: newRound

- buy: user enters artifact ID and sends value of price. price gets sent to the one who listed, artifact gets sent to user
- list:  user enters artifact + price. Transfers an artifact to from the user to the contract and then creates a "listing" with the price provided
- unlist: user enters artifact number. If they were the one to list it, the artifact is returned to them

- newRound: admin enters a timestamp and a new address for the tokens. If it is past the previous stored timestamp the stored timestamp and tokens address are updated to the new ones


### Frontend
- A table that shows the users withdrawn artifacts+stats with an input area on each row and a button that says "list" Clicking the button will call the list function of the smart contract with that artifacts id and the value of the input as paramaters.
- A footer to that table which shows the artifacts listed on the market that the user put up for sale themselves. Each row has an "unlist" button which on click calls the unlist function of the contract with the artifact chosen as input
- A second table containing all of the other artifacts listed at the market. Each row shows artifact+stats, and at the end of each row there is the price and a button labelled "buy". On click the buy function of the contract is called with the artifact as input and (price+fee) XDAI is sent with this function call
- On clicking any of these buttons and successfully listing, unlisting or buying; the UI updates and the row disappears.
- To get an up to date version of the market there is a "refresh" button that refreshes the whole plugin
- In order for this contract to be able to list the artifacts there is an "approve" button which calls the setApprovalForAll() on the ERC721 artifact contract
