import ConfirmPage from './page'
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { describe, it, expect, vi } from 'vitest';
import userEvent from "@testing-library/user-event"
import { useSearchParams } from "next/navigation"

vi.mock("next/navigation", () => ({
    useSearchParams: vi.fn(),
}))

// テストごとにURLのクエリパラメータ(token)を差し替えるためのヘルパー
function mockToken(token: string | null) {
    const params = new URLSearchParams(token ? { token } : {})
    vi.mocked(useSearchParams).mockReturnValue(params as ReturnType<typeof useSearchParams>)
}

describe('新しいパスワード入力画面', () => {
    it('見出し・入力欄・ボタンが表示される', () => {
        mockToken("test-token")
        render(<ConfirmPage />)

        expect(screen.getByText("新しいパスワードを設定")).toBeInTheDocument()
        expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("••••••••")).toHaveAttribute("type", "password")
        expect(screen.getByRole("button", { name: "パスワードを更新" })).toBeInTheDocument()
    })

    it('エラー表示', async () => {
        mockToken("test-token")
        const user = userEvent.setup()
        render(<ConfirmPage />)

        await user.click(screen.getByRole("button", { name: "パスワードを更新" }))
        expect(
            screen.getByText("新しいパスワードを入力してください")
        ).toBeInTheDocument()
    })

    it('tokenが無い場合はリンク無効のメッセージを表示する', () => {
        mockToken(null)
        render(<ConfirmPage />)

        expect(screen.getByText("リンクが無効です。もう一度パスワードリセットをお試しください。")).toBeInTheDocument()
        expect(screen.queryByLabelText("新しいパスワード")).not.toBeInTheDocument()
    })
})
