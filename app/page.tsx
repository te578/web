import { redirect } from 'next/navigation'

export default function Home() {
  // ルート("/")にアクセスしたらログインページへ移動する
  redirect('/login')
}
