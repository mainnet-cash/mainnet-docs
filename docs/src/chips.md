# CHIPs

The [Cash Improvement Proposal (CHIP)s](https://gitlab.com/im_uname/cash-improvement-proposals/-/blob/master/CHIPs.md) standard is a documentation and ecosystem process used in Bitcoin Cash to define proposals, evaluate risk/reward, and collect necessary feedback and agreement-building.

More discussion on [Bitcoin Cash Research](https://bitcoincashresearch.org/t/chips-a-more-detailed-process-recommendation/309)

## CHIP Statements

As part of this process, stakeholders participate in the agreement building process with public statements.

### Mainnet.cash supports CHIP-2022-02-CashTokens

[CashTokens](https://github.com/bitjson/cashtokens#readme) is an exciting proposal to bring tokens to a highly scalable UTXO blockchain as a first-class feature. 

In addition to both non-fungible and fungible tokens, the design allows for cross-contract communication, or the ability to create messages that can be read by other contracts. This opens an exciting realm of possibilities as outlined in the [examples](https://github.com/bitjson/cashtokens/blob/master/examples.md#usage-examples) section of the CHIP.

#### Maintenance & Future support

From a maintenance perspective, the core dependencies of mainnet-js (libauth, electron-cash, CashScript, fulcrum and BCHN) have all chosen to support CashTokens in May 2022, making it clear that mainnet.cash could implement CashTokens without making significant changes to dependencies or existing code.

The design of the current proposal differs from earlier token schemes which risked burning tokens in wallet software which was not token aware. 

Thankfully with CashTokens:

> tokens cannot be inadvertently destroyed by wallet software that does not support tokens.

So without any further feature expansion in mainnet.cash, users of the current or earlier versions of should not risk burning UTXOs if the library is unaware of newer tokens. This is a great feature, in addition to all the exciting developments it will enable.