package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/creack/pty"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/net/websocket"
)

var ptmx *os.File

func handleWebSocket(c echo.Context) error {
	log.Println("Serving at localhost:8000...")
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()

		// 初回のメッセージを送信
		// err := websocket.Message.Send(ws, "ターミナルと接続しました。\r\n")
		// if err != nil {
		// 	c.Logger().Error(err)
		// }
		// Create arbitrary command.
		f := exec.Command("bash")

		// Start the command with a pty.
		ptmx, err := pty.Start(f)
		if err != nil {
			log.Println("failed to create pty", err)
			return
		}

		go func() {
			for {
				// Client からのメッセージを読み込む
				msg := ""
				err := websocket.Message.Receive(ws, &msg)
				log.Println(msg)
				if err != nil {
					if err.Error() == "EOF" {
						log.Println(fmt.Errorf("read %s", err))
						// break をぬける
						break
					}
					log.Println(fmt.Errorf("read %s", err))
					c.Logger().Error(err)
				}

				_, err = ptmx.WriteString(msg + "\n")
				if err != nil {
					log.Println("failed to write data to ptmx:", err)
					return
				}

				// Client からのメッセージを元に返すメッセージを作成し送信する
				// err = websocket.Message.Send(ws, fmt.Sprintf("Server: \"%s\" received!", msg))
				// if err != nil {
				// 	c.Logger().Error(err)
				// }
			}
		}()
		log.Println(ws)
		_, _ = io.Copy(ws, ptmx)
	}).ServeHTTP(c.Response(), c.Request())

	return nil
}

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		Skipper:          middleware.DefaultSkipper,
		AllowOrigins:     []string{"http://localhost:3000", "ws://localhost:3000"},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPost, http.MethodDelete},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAccessControlAllowOrigin, echo.HeaderAccessControlAllowMethods},
		AllowCredentials: true,
	}))
	e.Static("/", "public")
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/socket.io", handleWebSocket)
	e.GET("/", handleWebSocket)
	e.Logger.Fatal(e.Start(":8080"))
}
