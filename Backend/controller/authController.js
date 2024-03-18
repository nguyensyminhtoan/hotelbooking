const User = require('../models/user')
exports.checkLogin = (req, res) =>
{
  const { email, password } = req.body
  // Tìm người dùng theo email
  User.findOne({ email: email })
    .then(user =>
    {
      if (!user)
      {
        delete req.user
        return res.status(401).json({ message: 'Người dùng chưa đăng nhập' })
      }
      if (user.password !== password)
      {
        // sai mật khẩu
        return res.status(401).json({ message: "Sai mật khẩu.Đăng nhập lại" })
      }
      // người dùng đã đăng nhập
      req.user = user
      return res.status(200).json({ message: "người dùng đã đăng nhập", isLogin: true, user: user })
    })

}
// Hàm kiểm tra tính hợp lệ của email
function isValidEmail(email)
{
  // Sử dụng biểu thức chính quy để kiểm tra định dạng của email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
exports.registerUser = (req, res) =>
{
  const email = req.body.email;
  const password = req.body.password;
  // Kiểm tra email và password tồn tại và hợp lệ
  if (!email || !password || !isValidEmail(email) || password.length < 8)
  {
    return res.status(400).json({ message: "Email hoặc password không hợp lệ" });
  }

  User.findOne({ email: email })
    .then(user =>
    {
      if (!user)
      {
        // Tạo người dùng mới nếu email chưa tồn tại
        const newUser = new User({ email: email, password: password })

        newUser.save()
          .then(() =>
          {
            res.status(200).json({ message: "Đăng ký thành công" });
          })
          .catch(err =>
          {
            res.status(500).json({ message: "Đã xảy ra lỗi khi tạo người dùng mới" });
          });
      } else
      {   // Trả về lỗi nếu email đã tồn tại
        res.status(409).json({
          message: "email đã đăng ký tài khoản"
        })
      }
    })
}
exports.login = (req, res) =>
{
  const email = req.body.email;
  const password = req.body.password;
  // Kiểm tra email và password tồn tại và hợp lệ
  if (!email || !password || !isValidEmail(email) || password.length < 8)
  {
    return res.status(400).json({ message: "Email hoặc password không hợp lệ" });
  }
  User.findOne({ email: email })
    .then(user =>
    {
      if (!user)
      {
        return res.status(401).json({ message: "tài khoản không tồn tại" })
      }
      if (user.password !== password)
      {
        return res.status(401).json({ message: "Sai mật khẩu" })
      }
      if (user.isAdmin === true)
      {
        return res.status(200).json(user)
      }

      return res.status(200).json({ isLogin: true, email: user.email })
    })
}