```mermaid
classDiagram
    class Storable {
        - key: string
        + Storable(key: string, defaultValue: T)
        + get(): T | null
        + set(value: T): void
    }
```