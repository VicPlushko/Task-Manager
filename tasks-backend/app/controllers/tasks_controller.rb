class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks,  except: [:created_at, :updated_at]
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    
    @task = Task.create(task_params)
    #  binding.pry
    params[:descriptions].each do |description|
      @instruction = Instruction.create(description: description, completed: false)
    @task.instructions << @instruction
    end
    # binding.pry
    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    # params[descriptions].each do |description|
    #   @instruction.update(description: description, completed: false)
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def task_params
      params.require(:task).permit(:name, :routine, :completed)
    end
end
