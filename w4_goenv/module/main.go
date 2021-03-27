package main

import (
  "fmt"
  "github.com/ryoktg/w4_goenv/stuff"
  "github.com/google/uuid"
)

func main() {
  stuff.Test()
  u := uuid.New()
  fmt.Println(u.String())
}
