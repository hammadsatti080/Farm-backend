const Admin = require("../models/Admin");


/* ======================
   REGISTER ADMIN
====================== */
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if admin exists
        const existing = await Admin.findOne({ username });

        if (existing) {
            return res.json({
                success: false,
                message: "Admin already exists",
            });
        }
        
        const adminId = "ADM-" + Date.now();
        const admin = await Admin.create({
            username,
            password,
            adminId, // ✅ add this
        });

        res.json({
            success: true,
            admin,
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
};
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json({ success: true, admins });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
exports.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true });
};

exports.updateAdmin = async (req, res) => {
    const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({ success: true, admin });
};


exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.json({
                success: false,
                message: "Admin not found",
            });
        }

        // ⚠️ simple password check (no hashing in your code yet)
        if (admin.password !== password) {
            return res.json({
                success: false,
                message: "Invalid password",
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            admin,
        });

    } catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
};

 