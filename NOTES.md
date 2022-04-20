
# Notes


## Referral Programme Articles

* https://growsurf.com/blog/b2c-subscription-referral-marketing
* https://blog.hubspot.com/service/customer-referral-program
* https://userguiding.com/blog/saas-referral-programs/




## Entities

As per Seneca convention, plurals are *not* used.



### sys/user

From @seneca/user - direct entity access.

Assumes fields:
* id



### refer/point

Referral entry point; link or code; many inbound users

Child: refer/entry


### refer/entry

A referral from a user to an invitee.

Does *not* store state. To allow for more flexible business rules, referral "state" is
determined by child roes in refer/occur

Parent: refer/point
Child: refer/occur


### refer/occur

An event in the referal process. Used instead of a single "state" on refer/entry

Triggers various external actions - rewards etc.

Parent: refer/entry


### refer/rule

Defined action triggers for rows in refer/occur
Actual actions are app specific - encoded by messages


### refer/reward

Track user "rewards" wrt referrals, such as # of referrals, kind of "points"

