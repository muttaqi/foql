Below is a proposal for the First-Order Query Language, a query language based on first-order logic.

# Syntax

### Reserved Symbols

| First-Order Logic| First-Order QL     | Definition |
| ---------------- | ------------------ | ---------- |
| 𝓠                | \Q                 | The 'query set', ie. the resultant query. First-order logic statements on this set can be used to specify what items should be returned. |
| 𝓤                |  \U                | The universe of discourse, or in this context the collection or table being queried. |
| ∈                | \e                 | Preceded by a bounded variable v and followed by a set S, this represents 'v in S'. Can also be used for substring and sub-array conditions. |
| ∀                | \A                 | Followed by a ∈ expression, this means following first-order logic statements are true for all members of the set, ie. a universal quantification. |
| ∃                | \E                 | Followed by a ∈ expression, this means following first-order logic statements are true for at least one member of the set, ie. a existential quantification. |
| ∃!               | \E!                | Same as above but asserts the uniqueness of the bound variable to follow. |
| ⟹               | =>                 | Within a universal or existential scope, represents implications. Can also be used between universal or existential scopes to represent aggregations. |
| &#124;           | &#124;             | Absolute value for a number or the size of a set |
| ∧                | ^                  | Conjunction of two statements |
| ∨                | v                  | Disjunction of two statements |
| ≤, ≥, ≠, =, >, < | <=,>=, !=, =, >, < | Represents comparison operators for scalars and strings |

### Fields

Accessing field 'f' of item 'x' should be represented by a function f(x)

# Evaluation

FOQL will return the most interesting query set, so as to avoid useless vacuous truths and make the syntax as expressive as possible. For example, a universal quantification

# Examples

### Query all items by a condition
```
\Ax\e\Q x\e\U ^ bool_field(x)
```

```
\Ax\e\Q x\e\U ^ num_field(x)=2
```

### Query first item by condition
```
\E!x\e\U x\e\Q ^ bool_field(x)
```

### Query first 'n' items by a condition
```
(\Ax\e\Q x\e\U ^ bool_field(x)) ^ |\Q| = n
```
