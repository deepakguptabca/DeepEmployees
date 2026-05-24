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

  if(!userId || !date) return res.status(400).json({message:"Provide userId and Date"})

  try {
    const existing = await Attendance.findOne({
      userId,
      date
    })

    
    if(!existing) return res.status(400).json({message:"attendance not found"})
      
    await existing.deleteOne();
    res.status(200).json({message:"attendance deleted successfully"})


  } catch (error) {
    console.log("error in delete attendance api :" , error);
    res.status(400).json({message:"internal server error"})
  }


}

export const getAttendanceForMonth = async (req,res) =>{
  const {userId,month,year} = req.body;

  if(!userId || !month || !year) return res.status(400).json({message : "provide userId ,month and year"});

  try {

    const startDate = new Date(year,month-1,1);
    startDate.setTime(0,0,0,0);

    const endDate = new Date(year,month,0);
    endDate.setHours(23,59,59,999)

    const attendance = await Attendance.find({
      userId,

      date : {
        $gte : startDate,
        $lte : endDate,
      },
    }).sort({date:1});

    res.status(200).json({
      success:true,
      attendance,
    })
    
  } catch (error) {
    console.log(
      "error in getAttendanceForMonthOfEmployee controller",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}