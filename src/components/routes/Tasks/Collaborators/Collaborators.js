import Avatar from "components/Avatar"
import Tooltip from "components/Tooltip"

import userRepository from "persistent/persistentUserRepository"

const Collaborators = ({ ids, userId }) => (
  <div>
    {
      ids.length > 1 && (
        <div className="mb-3 d-flex align-items-center flex-wrap border-top">
          <span className="me-2">Collaborators</span>
          {
            ids
              .filter(v => v !== userId)
              .map(id => {
                const user = userRepository.findUserById(id)

                return (
                  <Tooltip key={id} label={user.name}>
                    <div>
                      <Avatar user={user} size={35} />
                    </div>
                  </Tooltip>
                )
              })
          }
        </div>
      )
    }
  </div>
)

export default Collaborators

