import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { describe, it, expect, vi } from 'vitest';
import  LoginPage  from './page';
import userEvent from "@testing-library/user-event"

// next/navigation の useRouter はNext.jsの実行環境が無いと動かないため、テスト用に差し替える
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('ログイン画面', () => {
  it('エラー表示', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)

    // 未入力状態でログインボタンをクリック
    await user.click(screen.getByRole("button", { name: "ログイン" }))

    // エラーメッセージが表示されることを確認
    expect(
      screen.getByText("メールアドレスとパスワードを入力してください")
    ).toBeInTheDocument()
  })
})
