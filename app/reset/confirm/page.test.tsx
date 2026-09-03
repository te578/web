import ConfirmPage from './page'
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { describe, it, expect, vi } from 'vitest';
import userEvent from "@testing-library/user-event"

vi.mock("next/navigation", () => ({
    useSearchParams: () => new URLSearchParams("token=test-token"),
}))

describe('新しいパスワード入力画面', () => {
    it('見出し・入力欄・ボタンが表示される', () => {
        render(<ConfirmPage />)

        expect(screen.getByText("新しいパスワードを設定")).toBeInTheDocument()
        expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("••••••••")).toHaveAttribute("type", "password")
        expect(screen.getByRole("button", { name: "パスワードを更新" })).toBeInTheDocument()
    })

    it('エラー表示', async () => {
        const user = userEvent.setup()
        render(<ConfirmPage />)

        await user.click(screen.getByRole("button", { name: "パスワードを更新" }))
        expect(
            screen.getByText("新しいパスワードを入力してください")
        ).toBeInTheDocument()
    })
})
