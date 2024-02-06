import todoModel from "../model/todoModel.js";

export const createtodoController = async (request, response) => {
  try {

    const { todoName } = request.body;
    if (!todoName) {
      response.status(400).send({
        success: false,
        message: "Todo name is required",
      });
    }


    let todo = new todoModel({ todoName });
    todo.save();
    response.status(201).send({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    response.status(400).send({
      success: false,
      message: "Something went wrong while creating todo",
      error: error,
    });
  }
};


export const createtodonotauth = async (request,response)=>{
  try {
    const { todoName } = request.body;
    if (!todoName) {
      response.status(400).send({
        success: false,
        message: "Todo name is required",
      });
    }

    let todo = localStorage.setItem('todo',todoName)
    todo.save();
    response.status(201).send({
      success: true,
      message: "Todo created successfully",
      todo,
  })

  } catch (error) {

  }
}

export const updatetodoController = async (request, response) => {
  try {
    const { id } = request.params;
    const { todoName } = request.body;
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { todoName: todoName },
      { new: true }
    );
    response.status(201).send({
      success: true,
      message: "Successfully updated todo",
      todo
    })
  } catch (error) {
    response.status(400).send({
      success: false,
      message: "Something went wrong while creating todo",
      error: error,
    });
  }
};

// get single controller
export const getsingletodoController = async(request,response)=>{
try {
  const {id} = request.params
  const todo = await todoModel.findById(id)
  response.status(200).send({
    success:true,
    message:"Successfully get todo",
    todo
  })

} catch (error) {
  response.status(400).send({
    success: false,
    message: "Something went wrong while creating todo",
    error: error,
  });
}
}


export const gettodoController = async(request,response)=>{
try {
  const todo = await todoModel.find()
  response.status(200).send({
    success:true,
    message:"Successfully get todo",
    todo
  })
} catch (error) {
  response.status(400).send({
    success: false,
    message: "Something went wrong while getting todo",
    error: error,
  });

}
}

//delete todo controller
export const deletetodoController = async(request,response)=>{
  try {
    const {id} = request.params
    const todo = await todoModel.findByIdAndDelete(id)
    response.status(200).send({
      success:true,
      message:"Successfully deleted todo",
      todo
    })
  } catch (error) {
    response.status(400).send({
      success: false,
      message: "Something went wrong while deleting todo",
      error: error,
    });

  }
  }