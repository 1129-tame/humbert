package main

import (
	"io"
	"log"
	"os"
	"os/exec"

	"github.com/creack/pty"
)

func test() error {
	log.Println("hogehoge")
	// Create arbitrary command.
	c := exec.Command("bash")

	// Start the command with a pty.
	ptmx, err := pty.Start(c)
	if err != nil {
		return err
	}
	log.Println(&ptmx)

	_, err = ptmx.WriteString("ls\n")
	log.Println("ptmx")
	if err != nil {
		log.Println("failed to write data to ptmx:", err)
	}
	// Copy stdin to the pty and the pty to stdout.
	// NOTE: The goroutine will keep reading until the next keystroke before returning.
	go func() { _, _ = io.Copy(ptmx, os.Stdin) }()
	_, _ = io.Copy(os.Stdout, ptmx)
	return nil
}

func main2() {
	if err := test(); err != nil {
		log.Fatal(err)
	}
}
