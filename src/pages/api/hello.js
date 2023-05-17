import { nanoid } from "nanoid"

export default function handler(req, res) {
  
  console.log(nanoid(64))
  
  res.status(200).json({ name: 'John Doe' })

}
