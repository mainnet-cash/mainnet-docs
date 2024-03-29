# CHIPs

The [Cash Improvement Proposal (CHIP)s](https://gitlab.com/im_uname/cash-improvement-proposals/-/blob/master/CHIPs.md) standard is a documentation and ecosystem process used in Bitcoin Cash to define proposals, evaluate risk/reward, and collect necessary feedback and agreement-building.

More discussion on [Bitcoin Cash Research](https://bitcoincashresearch.org/t/chips-a-more-detailed-process-recommendation/309)

## CHIP Statements

As part of this process, stakeholders participate in the agreement building process with public statements.

### Mainnet.cash supports CHIP-2023-04 Adaptive Blocksize Limit Algorithm 

*2023-10-25*

The [Adaptive Blocksize Limit Algorithm](https://gitlab.com/0353F40E/ebaa) is a proposal to make the maximum blocksize dynamically adjust up and down with network usage. 

This upgrade is a consensus level change that should fix a focal point that was previously used to repeatedly divide the bitcoin community in to smaller and smaller factions. 

No code changes should be necessary with this proposal for users of mainnet.cash.

The independent developers maintaining mainnet.cash support the Adaptive Blocksize Limit Algorithm for Bitcoin Cash CHIP for the May 2024 upgrade. 

### Mainnet.cash supports CHIP-2022-02-CashTokens

*2022-11-09*

[CashTokens](https://github.com/bitjson/cashtokens#readme) is an exciting proposal to bring tokens to a highly scalable UTXO blockchain as a first-class feature. 

In addition to both non-fungible and fungible tokens, the design allows for cross-contract communication, or the ability to create messages that can be read by other contracts. This opens an exciting realm of possibilities as outlined in the [examples](https://github.com/bitjson/cashtokens/blob/master/examples.md#usage-examples) section of the CHIP.

#### Maintenance & Possible Implementation

From a maintenance perspective, the core dependencies of mainnet-js (libauth, electron-cash, CashScript, fulcrum and BCHN) have all chosen to support CashTokens in May 2022, making it clear that mainnet.cash could implement CashTokens without making significant changes to dependencies.

Implementation of CashTokens in mainnet.cash would depend on adoption or impact of those features. The design of the current CashToken proposal differs from earlier token schemes which risked burning tokens in wallet software which was not token aware. 

Thankfully with CashTokens:

> tokens cannot be inadvertently destroyed by wallet software that does not support tokens.

So without any further feature expansion in mainnet.cash, users of the current or earlier versions of should not risk burning UTXOs if the library is unaware of newer tokens. This is a great feature, in addition to all the exciting developments it will enable.