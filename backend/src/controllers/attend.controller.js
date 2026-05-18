import Attendance from "../models/attendance.model.js";

export const markAttendance = async (req, res) => {
  const { userId, status } = req.body;

  try {
    const date = new Date(req.body.date || Date.now());
    date.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      userId: userId,
      date: date,
    });

    if (existing)
      return res.status(400).json({ message: "attendance already registred" });

    const newAttendance = new Attendance({
      userId,
      date: date,
      status,
      markedBy: req.user.id,
    });

    if (newAttendance) {
      await newAttendance.save();
      res.status(201).json({
        message: "attendance marked successfully",
      });
    } else {
        res.status(400).json({message:"invalid attendance data"})
    }
  } catch (error) {
    console.log("error in attendance controller" , error.message)
    res.status(400).json({message: "internal server error"})
  }
};

export const updateAttendance = async (req,res) =>{
  const { userId, status } = req.body;

  try {
    const date = new Date(req.body.date || Date.now());
    date.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      userId: userId,
      date: date,
    });

    if (!existing)
      return res.status(400).json({ message: "attendance not registred yet" });

    existing.status = status;
    existing.markedBy = req.user.id;

  
      await existing.save();
      res.status(201).json({
        message: "attendance updated successfully",
      });
    
  } catch (error) {
    console.log("error in attendance update controller" , error.message)
    res.status(400).json({message: "internal server error"})
  }
}

export const deleteAttendance = async (req,res) =>{
  const {userId,date} = req.body;

  try {
    const existing = await Attendance.findOne({
      userId,
      date
    })

    if(!existing) return res.status(400).json({})



  } catch (error) {
    
  }


}