Below is a proposal for the First-Order Query Language, a query language based on first-order logic.

# Syntax

### Reserved Symbols

| First-Order Logic| First-Order QL     | Definition |
| ---------------- | ------------------ | ---------- |
| 𝓠                | /Q                 | The 'query set', ie. the resultant query. First-order logic statements on this set can be used to specify what items should be returned. |
| 𝓤                |  /U                | The universe of discourse, or in this context the collection or table being queried. |
| ∈                | /e                 | Preceded by a bounded variable v and followed by a set S, this represents 'v in S'. Can also be used for substring and sub-array conditions. |
| ∀                | /A                 | Followed by a ∈ expression, this means following first-order logic statements are true for all members of the set, ie. a universal quantification. |
| ∃                | /E                 | Followed by a ∈ expression, this means following first-order logic statements are true for at least one member of the set, ie. a existential quantification. |
| ∃!               | /E!                | Same as above but asserts the uniqueness of the bound variable to follow. |
| ∑	               | /S                 | Followed by a variable and a set, this represents the sum of an expression on members of a set |
| Π                | /P                 | Followed by a variable and a set, this represents the product of an expression on members of a set |
| ⟹               | =>                 | Within a universal or existential scope, represents implications. Can also be used between universal or existential scopes to represent aggregations. |
| &#124;           | &#124;             | Absolute value for a number or the size of a set |
| ∧                | ^                  | Conjunction of two statements |
| ∨                | v                  | Disjunction of two statements |
| ≤, ≥, ≠, =, >, < | <=,>=, !=, =, >, < | Represents comparison operators for scalars and strings |

### Fields

Accessing field 'f' of item 'x' should be represented by a function f(x)

# Supported Queries

### Query all items by a condition
```
/Ax/e/Q x/e/U ^ bool_field(x)
```

```
/Ax/e/Q x/e/U ^ num_field(x)=2
```

### Query first item by condition
```
/E!x/e/U x/e/Q ^ bool_field(x)
```

### Query first 'n' items by a condition
```
(/Ax/e/Q x/e/U ^ bool_field(x)) ^ |/Q| = n
```

### Aggregation with max accumulator
```
/Ax/e/Q (/Ey/e/U num_field_1(x) = num_field_1(y)) ^
    (/Ay/eR y/e/U ^ num_field_1(x) = num_field_1(y) ^ max_field(x) >= num_field_2(y)) ^
    (/Ey/eR num_field_2(y) = max_field(x))
```

### Aggregation with sum accumulator
```
/Ax/e/Q (/Ey/e/U num_field_1(x) = num_field_1(y)) ^
    (/Ay/eR y/e/U ^ num_field_1(x) = num_field_1(y)) ^
    sum_field(x) = /SyR num_field_2(x)
```

### Aggregation with product accumulator
```
/Ax/e/Q (/Ey/e/U num_field_1(x) = num_field_1(y)) ^
    (/Ay/eR y/e/U ^ num_field_1(x) = num_field_1(y)) ^
    prod_field(x) = /PyR num_field_2(x)
```

### Aggregation with filter then count accumulator
```
/Ax/e/Q (/Ey/e/U num_field_1(x) = num_field_1(y)) ^
    (/Ay/eR y/e/U ^ num_field_1(x) = num_field_1(y)) ^
    count_field(x) = |R|
```

# Parsing

An AST should be generated from the query using well-defined objects for each operator. Along this, a list of sets should be defined with, again well-defined properties. The AST should then be mutated or a new AST should be created to compute the Prenex Normal Form of the query. This will all be done in AssemblyScript to maximize performance, then be matched with various query types in a separate pure TypeScript module. Supported queries should be kept updated in this document.