Below is a proposal for the First-Order Query Language, a query language based on first-order logic.

# Syntax

### Reserved Symbols

| First-Order Logic | First-Order QL     | Definition                                                                                                                                                   |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 𝓠                 | /Q                 | The 'query set', ie. the resultant query. First-order logic statements on this set can be used to specify what items should be returned.                     |
| ∈                 | /e                 | Preceded by a bounded variable v and followed by a set S, this represents 'v in S'. Can also be used for substring and sub-array conditions.                 |
| ∀                 | /A                 | Followed by a ∈ expression, this means following first-order logic statements are true for all members of the set, ie. a universal quantification.           |
| ∃                 | /E                 | Followed by a ∈ expression, this means following first-order logic statements are true for at least one member of the set, ie. a existential quantification. |
| ∑                 | /S                 | Followed by a variable and a set, this represents the sum of an expression on members of a set                                                               |
| Π                 | /P                 | Followed by a variable and a set, this represents the product of an expression on members of a set                                                           |
| &#124;            | &#124;             | Absolute value for a number or the size of a set                                                                                                             |
| ∧                 | ^                  | Conjunction of two statements                                                                                                                                |
| ∨                 | v                  | Disjunction of two statements                                                                                                                                |
| ⊆                 | /c                 | Subset of a set                                                                                                                                              |
| ≤, ≥, ≠, =, >, <  | <=,>=, !=, =, >, < | Represents comparison operators for scalars and strings                                                                                                      |
| idx               | idx                | Index of an element in a set                                                                                                                                 |

### Fields

Accessing field 'f' of item 'x' should be represented by a function f(x)

# Building Blocks

### Conditional Subset

```
/Q = {v /e S ^ c}
```

where c is some condition on the item v, and S is a set

### Set Size

```
/Q /c {v /e S} ^ |/Q| = n
```

where n is a number representing the size of Q

### Set Ordering

```
/Q = {v /e S ^ f(v) >= g(w) ^ idx(v) > idx(w) ^ w \e S}
```

where f, g are fields of items in S, and v, w are elements of S

### Introduction of Fields

```
f(v) = e ^ v /e S
```

where e is some expression, S is a set and f is a field not defined in items of S

### Introduction of Objects

```
f(v) = e ^ g(v) = d ^ h(v) = c ^ v /e /Q
```

where f, g, h are fields, e, d, c are expressions, and Q is the set that will hold the objects

### Functions on Sets

```
/Q = g(S)
```

where g is a field of elements of S

```
f(v) = h(g(S)) ^ v /e /Q
```

where g is a field of elements of S and h is a function on the set with elements of the type g, a.k.a. an aggregation

###

# Example Queries

### Query all items by a condition

```
/Q = {v /e S ^ f(v) = 2}
```

### Query first item by condition

```
/Q /c {v /e S ^ f(v) = 2} ^ |Q| = 1
```

### Query first 'n' items by a condition

```
/Q /c {v /e S ^ f(v) = 2} ^ |Q| = n
```

### Aggregation with max accumulator grouped by some field

```
max_f(v) = max(f({w /e S ^ g(v) = g(w)})) ^ v /in Q
```

### Aggregation with sum accumulator

```
sum_f(v) = /S(f({w /e S ^ g(v) = g(w)})) ^ v /in Q
```

### Aggregation with product accumulator

```
prod_f(v) = /P(f({w /e S ^ g(v) = g(w)})) ^ v /in Q
```

### Aggregation with filter then count accumulator

```
count_f(v) = |f({w /e S ^ g(v) = g(w) ^ h(w) < 100})| ^ v /in Q
```
