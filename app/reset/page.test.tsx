import ResetPage from './page'
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event"

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn()}),
}))
describe('パスワードリセット画面',() => {
    it('エラー表示', async () => {
        const user = userEvent.setup()
        render(<ResetPage />)

        await user.click(screen.getByRole("button", { name: "パスワードリセット" }))
        expect(
            screen.getByText("メールアドレスを入力してください")
        ).toBeInTheDocument()    
     })
})